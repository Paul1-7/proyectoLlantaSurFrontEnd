// material
import { useTheme, Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function SeverErrorIllustration({ ...other }) {
  const theme = useTheme();
  const PRIMARY_LIGHTER = theme.palette.primary.lighter;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;
  const PRIMARY_DARKER = theme.palette.primary.darker;

  return (
    <Box {...other}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="100%"
        height="100%"
        viewBox="0 0 480 360"
      >
        <defs>
          <linearGradient id="BG" x1="19.496%" x2="77.479%" y1="71.822%" y2="16.69%">
            <stop offset="0%" stopColor={PRIMARY_MAIN} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} stopOpacity="0" />
          </linearGradient>
        </defs>
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <g>
            <path
              fill="url(#BG)"
              fillRule="nonzero"
              d="M0 198.78c0 41.458 14.945 79.236 39.539 107.786 28.214 32.765 69.128 53.365 114.734 53.434a148.44 148.44 0 0056.495-11.036c9.051-3.699 19.182-3.274 27.948 1.107a75.779 75.779 0 0033.957 8.01c5.023 0 9.942-.494 14.7-1.433 13.58-2.67 25.94-8.99 36.09-17.94 6.378-5.627 14.547-8.456 22.897-8.446h.142c27.589 0 53.215-8.732 74.492-23.696 19.021-13.36 34.554-31.696 44.904-53.224C474.92 234.58 480 213.388 480 190.958c0-76.93-59.774-139.305-133.498-139.305-7.516 0-14.88.663-22.063 1.899C305.418 21.42 271.355 0 232.499 0a103.651 103.651 0 00-45.88 10.661c-13.24 6.487-25.011 15.705-34.64 26.939-32.698.544-62.931 11.69-87.676 30.291C25.351 97.155 0 144.882 0 198.781z"
              opacity="0.2"
            />
            <path
              fill={PRIMARY_MAIN}
              fillRule="nonzero"
              d="M272.423 266.439L265.112 266.439 265.112 265.804 271.778 265.804 271.778 206.162 246.073 206.162 246.073 117.996 222.475 117.996 222.475 117.361 246.708 117.361 246.708 205.526 272.423 205.526z"
            />
            <path
              fill={PRIMARY_MAIN}
              fillRule="nonzero"
              d="M126.041 164.5L125.397 164.5 125.397 143.416 141.85 143.416 141.85 124.385 142.485 124.385 142.485 144.061 126.041 144.061z"
            />
            <path
              fill={PRIMARY_MAIN}
              fillRule="nonzero"
              d="M222.456 112.315a12.072 12.072 0 01-12.079 12.07h-82.752a12.078 12.078 0 110-24.149h2.762A23.799 23.799 0 01153.303 70h7.043a23.763 23.763 0 0121.121 12.835 14.196 14.196 0 016.5-1.566h1.842a14.316 14.316 0 0114.316 14.317v.709a14.277 14.277 0 01-.552 3.941h6.85c6.651.03 12.028 5.428 12.033 12.079z"
              opacity="0.12"
            />
            <path
              fill="#FFF"
              fillRule="nonzero"
              d="M253.254 244.407a2.164 2.164 0 01-2.164-2.117v-14.023a9.207 9.207 0 00-18.414 0v14.023a2.162 2.162 0 11-4.327 0v-14.023c0-7.474 6.06-13.534 13.534-13.534 7.475 0 13.535 6.06 13.535 13.534v14.023a2.164 2.164 0 01-2.164 2.117z"
            />
            <path
              fill="#FFF"
              fillRule="nonzero"
              d="M255.417 228.267v14.023a2.143 2.143 0 01-1.068 1.841c-.33.2-.709.305-1.095.304a2.164 2.164 0 01-2.164-2.145v-14.023a9.207 9.207 0 00-8.111-9.142 9.207 9.207 0 00-10.303 9.142v14.023a2.16 2.16 0 01-1.068 1.841c-.333.2-.715.305-1.105.304a2.173 2.173 0 01-2.163-2.164v-14.004c.01-7.474 6.069-13.529 13.543-13.534.366 0 .732.018 1.096.055 7.023.571 12.433 6.434 12.438 13.479z"
            />
            <path
              fill="#DFE3E8"
              fillRule="nonzero"
              d="M255.417 228.267v14.023a1.233 1.233 0 11-2.126 0v-14.023a9.207 9.207 0 00-10.312-9.142 9.207 9.207 0 00-10.303 9.142v14.023a1.234 1.234 0 11-2.136 0v-14.023a12.474 12.474 0 0118.974-11.691 12.472 12.472 0 015.885 11.691h.018z"
            />
            <rect
              width="47.766"
              height="47.766"
              x="217.347"
              y="242.234"
              fill={PRIMARY_DARKER}
              fillRule="nonzero"
              rx="7.305"
            />
            <rect
              width="39.479"
              height="47.756"
              x="225.633"
              y="242.244"
              fill={PRIMARY_DARK}
              fillRule="nonzero"
              rx="7.297"
            />
            <path
              fill={PRIMARY_DARKER}
              fillRule="nonzero"
              d="M244.424 267.737c.503-1.769-.846-3.727-1.168-5.539a3.038 3.038 0 115.987-.025c-.307 1.813-1.628 3.808-1.075 5.562l.399 1.269a2.361 2.361 0 11-4.522.064l.379-1.331z"
            />
            <rect width="38" height="38.752" x="228" y="145" fill={PRIMARY_MAIN} fillRule="nonzero" rx="8" />
            <rect
              width="28.413"
              height="38.752"
              x="80.568"
              y="129.67"
              fill={PRIMARY_MAIN}
              fillRule="nonzero"
              opacity="0.18"
              rx="3"
            />
            <rect width="28.413" height="38.752" x="73.645" y="135.949" fill="#FFF" fillRule="nonzero" rx="3" />
            <rect
              width="28.413"
              height="38.752"
              x="73.645"
              y="135.949"
              fill={PRIMARY_MAIN}
              fillRule="nonzero"
              opacity="0.48"
              rx="3"
            />
            <path
              fill={PRIMARY_DARKER}
              fillRule="nonzero"
              d="M60 243.462c.21 1.976.895 3.872 1.998 5.525 4.42 7.807 9.373 15.495 16.213 21.286 10.064 8.507 23.229 12.181 35.953 15.652-1.132-.553-2.504-6.445-3.01-7.706-.985-2.523-1.906-5.073-2.845-7.615-1.501-4.005-4.604-7.227-7.697-10.182a60.761 60.761 0 00-24.546-14.437A57.813 57.813 0 0060 243.462z"
            />
            <path
              fill={PRIMARY_MAIN}
              fillRule="nonzero"
              d="M109.782 247.836c-1.041-7.265-2.109-14.621-5.027-21.351-2.919-6.73-7.983-12.89-14.86-15.403-.203 10.397-.402 20.792-.599 31.184-.12 6.002-.22 12.125 1.501 17.879 3.03 10.128 13.516 21.922 23.616 25.255 1.501-4.843-1.013-12.181-1.731-17.217l-2.9-20.347z"
            />
            <rect width="114" height="36" x="111.587" y="164" fill={PRIMARY_DARK} fillRule="nonzero" rx="8.428" />
            <rect width="108" height="36" x="117.587" y="164" fill={PRIMARY_MAIN} fillRule="nonzero" rx="8.428" />
            <path
              fill={PRIMARY_LIGHTER}
              fillRule="nonzero"
              d="M141.587 181.844a4 4 0 11-8 0 4 4 0 018 0zm12 0a4 4 0 11-8 0 4 4 0 018 0zm8 4a4 4 0 100-8 4 4 0 000 8z"
            />
            <rect width="114" height="36" x="111.587" y="208" fill={PRIMARY_DARK} fillRule="nonzero" rx="8.428" />
            <path
              fill={PRIMARY_MAIN}
              fillRule="nonzero"
              d="M226 217.583v16.815c.008 2.549-1.045 4.995-2.923 6.798-1.879 1.802-4.43 2.811-7.087 2.804h-87.999c-2.653 0-5.197-1.012-7.072-2.813-1.874-1.802-2.924-4.244-2.919-6.789v-16.815c0-5.292 4.473-9.583 9.991-9.583h87.999c2.653-.005 5.199 1.003 7.077 2.8 1.878 1.798 2.933 4.239 2.933 6.783z"
            />
            <path
              fill={PRIMARY_LIGHTER}
              fillRule="nonzero"
              d="M142 226a4 4 0 11-8 0 4 4 0 018 0zm12 0a4 4 0 11-8 0 4 4 0 018 0zm8 4a4 4 0 100-8 4 4 0 000 8z"
            />
            <rect width="32" height="4" x="183" y="224" fill={PRIMARY_LIGHTER} fillRule="nonzero" rx="1" />
            <rect width="114" height="36" x="111.587" y="252.209" fill={PRIMARY_DARK} fillRule="nonzero" rx="8.428" />
            <rect width="108" height="36" x="118" y="252" fill={PRIMARY_MAIN} fillRule="nonzero" rx="8.428" />
            <path
              fill={PRIMARY_LIGHTER}
              fillRule="nonzero"
              d="M142 270a4 4 0 11-8 0 4 4 0 018 0zm12 0a4 4 0 11-8 0 4 4 0 018 0zm8 4a4 4 0 100-8 4 4 0 000 8z"
            />
            <rect width="32" height="4" x="182" y="268" fill={PRIMARY_LIGHTER} fillRule="nonzero" rx="1" />
            <path
              fill={PRIMARY_DARKER}
              fillRule="nonzero"
              d="M238 158.813l9.186-4.813 8.814 4.787s-1.638 11.825-8.597 15.213c-.017 0-8.649-3.31-9.403-15.187z"
            />
            <image
              width="181"
              height="300"
              x="259"
              y="30"
              transform="matrix(-1 0 0 1 699 0)"
              xlinkHref="/static/illustrations/personLeaning.png"
            />
          </g>
        </g>
      </svg>
    </Box>
  );
}
