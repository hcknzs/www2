import { useIntervalEffect } from "@react-hookz/web";
import { useState } from "react";
import { cn } from "../utils/tailwind.js";
import { usePrefersReducedMotion } from "../utils/misc.js";

const particles = ["#", "*/", "/*", "~", "░", "▒", "▓", "+=", "~/", "./", "/."];

const rnd = (lower: number, upper: number): number =>
	lower + Math.round(Math.random() * (upper - lower));

const getParticle = () => ({
	char: particles[rnd(0, particles.length)],
	id: crypto.randomUUID(),
	size: `${rnd(1, 4)}em`,
	x: `${rnd(0, 100)}%`,
	y: `${rnd(0, 100)}%`,
});

export const Noise: React.FC<{
	busyness?: number;
	opacity?: number;
	className?: string;
}> = ({ busyness = 7, opacity = 0.2, className }) => {
	const prefersReducedMotion = usePrefersReducedMotion();
	const [noise, setNoise] = useState<Array<ReturnType<typeof getParticle>>>(
		[],
	);
	const [timing, setTiming] = useState(1);

	useIntervalEffect(() => {
		setNoise((old) => {
			const halfLength = Math.floor(old.length / 2);
			const oldHalf = old
				.sort(() => Math.random() - 0.5)
				.splice(0, halfLength);
			const nextLength = Math.min(rnd(2, halfLength), busyness);
			const nextHalf = [...new Array(nextLength)].map(getParticle);
			return [...oldHalf, ...nextHalf];
		});
		setTiming(rnd(7000, 21000) / busyness);
	}, timing);

	return prefersReducedMotion ? null : (
		<div
			aria-hidden
			className={cn(
				className,
				`font-plex-mono text-md lg:text-3xl absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[0] animate-strobe motion-reduce:animate-none`,
			)}
		>
			{noise.map(({ char, id, size, x, y }) => (
				<span
					className="absolute"
					key={id}
					style={{
						fontSize: size,
						left: x,
						opacity,
						top: y,
					}}
				>
					{char}
				</span>
			))}
		</div>
	);
};
