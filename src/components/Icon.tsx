interface Props {
    width?: number;
    height?: number;
    className?: string;
    strokeWidth?: number;
}

export const Icon = {
    Upload: ({ width = 16, height = 16, strokeWidth = 2, className }: Props) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={width}
            height={height}
            fill="none"
            className={className}
        >
            <path
                d="M5 21C9.20998 16.2487 13.9412 9.9475 21 14.6734"
                stroke="currentColor"
                strokeWidth={strokeWidth}
            />
            <path
                d="M17 4.50012C17.4915 3.99442 18.7998 2.00012 19.5 2.00012M22 4.50012C21.5085 3.99442 20.2002 2.00012 19.5 2.00012M19.5 2.00012V10.0001"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20.9999 13C20.998 17.147 20.9472 19.2703 19.6088 20.6088C18.2175 22 15.9783 22 11.5 22C7.02166 22 4.78249 22 3.39124 20.6088C2 19.2175 2 16.9783 2 12.5C2 8.02166 2 5.78249 3.39124 4.39124C4.78249 3 7.02166 3 11.5 3C11.6699 3 14 3.00008 14 3.00008"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
            />
        </svg>
    ),

    Blockchain: ({ width = 16, height = 16, strokeWidth = 2, className }: Props) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={width}
            height={height}
            className={className}
            fill="none"
        >
            <path
                d="M12 21C12.2792 21 12.5388 20.8728 13.0579 20.6184L17.2304 18.5737C19.0768 17.6688 20 17.2164 20 16.5V7.5M12 21C11.7208 21 11.4612 20.8728 10.9421 20.6184L6.76956 18.5737C4.92319 17.6688 4 17.2164 4 16.5V7.5M12 21V12"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.9421 3.38159C11.4612 3.1272 11.7208 3 12 3C12.2792 3 12.5388 3.1272 13.0579 3.38159L17.2304 5.42635C19.0768 6.33116 20 6.78357 20 7.5C20 8.21643 19.0768 8.66884 17.2304 9.57365L13.0579 11.6184C12.5388 11.8728 12.2792 12 12 12C11.7208 12 11.4612 11.8728 10.9421 11.6184L6.76956 9.57365C4.92319 8.66884 4 8.21643 4 7.5C4 6.78357 4.92319 6.33116 6.76956 5.42635L10.9421 3.38159Z"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
            />
        </svg>
    ),

    Refresh: ({ width = 16, height = 16, strokeWidth = 2, className }: Props) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={width}
            height={height}
            fill={"none"}
            className={className}
        >
            <path
                d="M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
};
