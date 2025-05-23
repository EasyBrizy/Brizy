export const Logo = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={100}
    height={38}
    viewBox="0 0 100 38"
    className={className}
  >
    <defs>
      <filter x="-2%" y="-3.4%" width="104.1%" height="113.6%" filterUnits="objectBoundingBox" id="b">
        <feOffset dy={1} in="SourceAlpha" result="shadowOffsetOuter1" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.27 0" in="shadowOffsetOuter1" />
      </filter>
      <filter x="-2%" y="-5.9%" width="104.1%" height="123.5%" filterUnits="objectBoundingBox" id="d">
        <feOffset dy={1} in="SourceAlpha" result="shadowOffsetOuter1" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.29 0" in="shadowOffsetOuter1" />
      </filter>
      <path
        d="m6.352 16.078 12.262-7.345 12.263 7.345-12.263 7.344zm4.401.175 7.861 4.721 7.86-4.721-7.86-4.722z"
        id="c"
      />
      <path id="e" d="m6.352 22.235 2.196-1.292 10.066 5.914 10.131-5.875 2.132 1.253-12.263 7.212z" />
      <linearGradient x1="61.229%" y1="11.54%" x2="38.252%" y2="107.032%" id="a">
        <stop stopColor="#3D3AC4" offset="0%" />
        <stop stopColor="#56C5FD" offset="69.263%" />
        <stop stopColor="#BBF8FF" offset="100%" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <path d="M19 38c19 0 19-3.8 19-19S38 0 19 0 0 3.8 0 19s0 19 19 19" fill="url(#a)" />
      <use fill="#000" filter="url(#b)" xlinkHref="#c" />
      <use fill="#FFF" xlinkHref="#c" />
      <g opacity={0.75}>
        <use fill="#000" filter="url(#d)" xlinkHref="#e" />
        <use fill="#FFF" xlinkHref="#e" />
      </g>
      <path
        d="M54.78 28c4.088 0 6.055-2.12 6.055-5.065 0-2.54-1.498-4.152-3.63-4.685v-.05c1.879-.75 2.704-2.463 2.704-4.165 0-3.009-2.197-4.507-6.005-4.507H47.48V28zm-1.168-10.816h-2.996v-4.837h2.678c2.425-.013 3.416.94 3.416 2.386 0 1.752-1.537 2.45-3.098 2.45m.241 7.997h-3.237V19.9h3.3c2.4 0 3.644 1.04 3.644 2.69 0 1.74-1.51 2.578-3.707 2.59M65.738 28v-6.018c0-2.056 1.256-3.643 3.465-3.643.204 0 .546.012.876.038V15.14c-.101-.013-.228-.013-.355-.013-1.549 0-2.958.75-3.948 2.095h-.038v-1.905H62.83V28zm7.3-14.574c1.067 0 1.956-.864 1.956-1.93 0-1.054-.889-1.93-1.955-1.93-1.105 0-1.968.876-1.968 1.93 0 1.066.863 1.93 1.968 1.93M74.474 28V15.318h-2.907V28zm12.43 0v-2.476h-6.525v-.038l6.627-8.163v-2.005H76.9v2.475h6.093v.038l-6.525 8.125V28zm6.527 5.141 6.97-17.823h-3.047l-3.262 8.556h-.026l-3.504-8.556h-3.06l5.155 11.971-2.285 5.852z"
        fill="#0E0736"
        fillRule="nonzero"
      />
    </g>
  </svg>
);
