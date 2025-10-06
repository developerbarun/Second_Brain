export const ImageIcon = ({ size = 22 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.8}
    stroke="currentColor"
    width={size}
    height={size}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11l4 6H5l4-5 3 4 3-5z"
    />
  </svg>
);
