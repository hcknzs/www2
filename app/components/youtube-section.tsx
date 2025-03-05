import { useLocalStorageValue } from "@react-hookz/web";
import { Section, SectionInner } from "./section";
import { CmsImage, ResponsiveImageType } from "./cms-image";
import { useString } from "~/i18n";

type Props = { id: string; poster: ResponsiveImageType };

const Consent: React.FC<Props & { onAccept: () => void }> = ({
	onAccept,
	poster,
}) => {
	const t = useString();
	return (
		<div className="relative">
			{poster.data && (
				<CmsImage
					objectFit="contain"
					className="absolute inset-0"
					data={poster.data}
				/>
			)}
			<div>
				<p>{t("youtube.consent")}</p>
				<button onClick={onAccept}>Yes</button>
			</div>
		</div>
	);
};

const Video: React.FC<Props> = ({ id }) => {
	return (
		<iframe
			className="block aspect-video h-auto w-full"
			width="1280"
			height="720"
			src={`https://www.youtube-nocookie.com/embed/${id}?controls=1`}
			title="YouTube video player"
			frameBorder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerPolicy="strict-origin-when-cross-origin"
			allowFullScreen
		></iframe>
	);
};

const Inner: React.FC<Props> = (props) => {
	const { set, value: isConsented } = useLocalStorageValue("youtube", {
		defaultValue: false,
		initializeWithValue: false,
	});

	if (!isConsented) return <Consent {...props} onAccept={() => set(true)} />;

	return (
		<div className="m-auto max-w-screen-xl">
			<Video {...props} />
		</div>
	);
};

export const YoutubeSection: React.FC<Props> = (props) => (
	<Section className="items-middle flex min-h-[90vh] justify-center">
		<Inner {...props} />
	</Section>
);
