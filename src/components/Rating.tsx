import classNames from "classnames";

import "./Rating.css";

type RatingProps = {
	className?: string;
	value: number;
};

export default function Rating({ className, value }: RatingProps) {
	const isLowRating = value > 0 && value < 50;
	const isMediumRating = value >= 50 && value < 70;
	const isHightRating = value >= 70;
	const renderRating = value > 0 ? `${value.toFixed(0)}%` : "NR";

	return (
		<div
			className={classNames(
				"root",
				className,
				{ ['hight']: isHightRating },
				{ ['medium']: isMediumRating },
				{ ['low']: isLowRating }
			)}
		>
			{renderRating}
		</div>
	);
}
