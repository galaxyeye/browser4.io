const STAR_BADGE_URL =
    'https://img.shields.io/github/stars/platonai/Browser4?style=flat&label=Stars&labelColor=1e293b&color=38bdf8';

type GitHubStarsProps = {
    alt?: string;
    className?: string;
};

export default function GitHubStars({ alt = 'GitHub Stars', className = '' }: GitHubStarsProps) {
    return (
        <img
            src={STAR_BADGE_URL}
            alt={alt}
            title={alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            className={`inline-block h-5 w-auto align-middle ${className}`}
        />
    );
}
