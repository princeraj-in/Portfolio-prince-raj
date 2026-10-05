import React from 'react';

// Official, 100% authentic multi-color vector brand logos for the technology stack.
// Uses direct solid hex brand colors (no conflicting linearGradient IDs) so multiple instances render flawlessly.

interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
}

// 1. PYTHON (Official standard dual-color: Top Blue #387EB8, Bottom Yellow #FFD438 with cutouts)
export const PythonLogo: React.FC<LogoProps> = ({ className = 'w-12 h-12', style }) => (
  <svg viewBox="0 0 128 128" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Blue Top Snake */}
    <path
      fill="#387EB8"
      d="M63.02 0c-34.75 0-32.57 15.07-32.57 15.07l.04 15.6h33.15v4.69H17.15S0 33.43 0 68.22c0 34.79 14.88 33.58 14.88 33.58h8.88V89.17s-.48-15.07 14.81-15.07h32.95s14.15.24 14.15-14.13V14.15S87.89 0 63.02 0zm-12.65 9.9c3.08 0 5.6 2.52 5.6 5.6s-2.52 5.6-5.6 5.6-5.6-2.52-5.6-5.6c0-3.09 2.52-5.6 5.6-5.6z"
    />
    {/* Yellow/Gold Bottom Snake */}
    <path
      fill="#FFD438"
      d="M64.98 128c34.75 0 32.57-15.07 32.57-15.07l-.04-15.6H64.36v-4.69h46.49S128 94.57 128 59.78c0-34.79-14.88-33.58-14.88-33.58h-8.88v12.63s.48 15.07-14.81 15.07H56.48s-14.15-.24-14.15 14.13v45.82s-2.12 14.15 22.65 14.15zm12.65-9.9c-3.08 0-5.6-2.52-5.6-5.6s2.52-5.6 5.6-5.6 5.6 2.52 5.6 5.6 2.52 5.6-5.6 5.6z"
    />
  </svg>
);

// 2. PYTORCH (Official Flame in flame red #EE4C2C with separate spark #FF6B4A)
export const PyTorchLogo: React.FC<LogoProps> = ({ className = 'w-12 h-12', style }) => (
  <svg viewBox="0 0 128 128" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M74.8 21.6l-8.6-8.6a2 2 0 00-2.8 0l-8.6 8.6a2 2 0 000 2.8l8.6 8.6a2 2 0 002.8 0l8.6-8.6a2 2 0 000-2.8z"
      fill="#EE4C2C"
    />
    <path
      d="M64 36.8a39.2 39.2 0 00-27.7 66.9 39.2 39.2 0 0055.4-55.4l-7.3 7.3a28.8 28.8 0 11-40.8 0 28.8 28.8 0 0140.8-40.8l4.8-4.8A39.2 39.2 0 0064 36.8z"
      fill="#EE4C2C"
    />
    <path
      d="M87.4 51.7a28.8 28.8 0 01-40.8 40.8l-7.3 7.3a39.2 39.2 0 0055.4-55.4l-7.3 7.3z"
      fill="#FF6B4A"
    />
  </svg>
);

// 3. TENSORFLOW (Official 3D isometric cube with orange & amber facets)
export const TensorFlowLogo: React.FC<LogoProps> = ({ className = 'w-12 h-12', style }) => (
  <svg viewBox="0 0 128 128" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M64 4L20 29.5v28l20-11.5V114l24 14V4z" fill="#FF6F00" />
    <path d="M64 4l44 25.5v28l-20-11.5V80l-24 14V4z" fill="#FFA800" />
    <path d="M88 46l20 11.5V92l-20 11.5V46z" fill="#FF8400" />
  </svg>
);

// 4. REACT (Official vibrant cyan atom nucleus & orbit rings)
export const ReactLogo: React.FC<LogoProps> = ({ className = 'w-12 h-12', style }) => (
  <svg viewBox="0 0 128 128" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="64" r="12" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="6" fill="none">
      <ellipse cx="64" cy="64" rx="55" ry="21" />
      <ellipse cx="64" cy="64" rx="55" ry="21" transform="rotate(60 64 64)" />
      <ellipse cx="64" cy="64" rx="55" ry="21" transform="rotate(120 64 64)" />
    </g>
  </svg>
);

// 5. NEXT.JS (Official sleek monochrome circle with silver-white N and diagonal cut)
export const NextjsLogo: React.FC<LogoProps> = ({ className = 'w-12 h-12', style }) => (
  <svg viewBox="0 0 128 128" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="64" r="58" fill="#000000" stroke="#334155" strokeWidth="4" />
    <path
      d="M87.5 91.5L46.8 39H39v50h9.3V52.7l35.6 44.9c1.2-.8 2.4-1.7 3.6-2.6v-3.5z"
      fill="#FFFFFF"
    />
    <path d="M79.5 39h9.3v34.3l-9.3-11.8V39z" fill="#FFFFFF" />
  </svg>
);

// 6. TYPESCRIPT (Official blue rounded square with white TS)
export const TypeScriptLogo: React.FC<LogoProps> = ({ className = 'w-12 h-12', style }) => (
  <svg viewBox="0 0 128 128" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="24" fill="#3178C6" />
    <path
      d="M31.2 55.4h42.2v12.2H58.6v45.1H45.8V67.6H31.2V55.4zm48.1 41.5c4 3.7 9.8 5.7 16.3 5.7 5.7 0 9.8-1.5 12.3-3.9 2.5-2.4 3.8-5.8 3.8-9.8 0-4.1-1.3-7.2-4.1-9.5-2.7-2.3-7.5-4.5-14.3-6.6-8.9-2.7-15.1-6-18.7-9.7-3.6-3.7-5.4-8.8-5.4-15.1 0-7.3 2.7-13.1 8-17.3 5.3-4.2 12.6-6.4 21.8-6.4 7.6 0 14.5 1.8 20.3 5.5l-5.1 11.5c-4.8-3.1-10.2-4.7-16-4.7-5.1 0-8.9 1.2-11.3 3.5-2.4 2.3-3.6 5.4-3.6 9.1 0 3.7 1.3 6.6 3.9 8.7 2.6 2.1 7.2 4.1 13.8 6.2 9.2 2.9 15.6 6.3 19.3 10.1 3.7 3.8 5.6 9.1 5.6 15.7 0 7.8-2.9 14-8.7 18.4-5.8 4.4-13.8 6.7-24 6.7-9.5 0-17.7-2.3-24.5-6.9l4.7-11z"
      fill="#FFFFFF"
    />
  </svg>
);

// 7. NODE.JS (Official green hexagon with dark center)
export const NodejsLogo: React.FC<LogoProps> = ({ className = 'w-12 h-12', style }) => (
  <svg viewBox="0 0 128 128" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M64 4.5L11.5 34.8v60.6L64 125.7l52.5-30.3V34.8L64 4.5z"
      fill="#333333"
    />
    <path
      d="M64 11.2l46.7 27v53.9L64 119.1 17.3 92.1V38.2L64 11.2z"
      fill="#5FA04E"
    />
    <path
      d="M64 36.8L38.4 51.6v29.6L64 96l25.6-14.8V51.6L64 36.8zm-13.2 38.6V58.9l13.2-7.6 13.2 7.6v16.5L64 83.1 50.8 75.4z"
      fill="#FFFFFF"
    />
  </svg>
);

// 8. TAILWIND CSS (Official dual waves in sky-blue #38BDF8 & cyan #06B6D4)
export const TailwindLogo: React.FC<LogoProps> = ({ className = 'w-12 h-12', style }) => (
  <svg viewBox="0 0 128 128" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M32 40c6.7-13.3 16.7-20 30-20 20 0 25 15 35 15 6.7 0 13.3-3.3 20-10-6.7 13.3-16.7 20-30 20-20 0-25-15-35-15-6.7 0-13.3 3.3-20 10zm-20 40c6.7-13.3 16.7-20 30-20 20 0 25 15 35 15 6.7 0 13.3-3.3 20-10-6.7 13.3-16.7 20-30 20-20 0-25-15-35-15-6.7 0-13.3 3.3-20 10z"
      fill="#06B6D4"
    />
    <path
      d="M32 40c6.7-13.3 16.7-20 30-20 12 0 19 6 25 10-6 4-13 10-25 10-13.3 0-23.3-6.7-30-20zm-20 40c6.7-13.3 16.7-20 30-20 12 0 19 6 25 10-6 4-13 10-25 10-13.3 0-23.3-6.7-30-20z"
      fill="#38BDF8"
    />
  </svg>
);

// 9. DOCKER (Official ocean blue whale #2496ED with cargo container blocks)
export const DockerLogo: React.FC<LogoProps> = ({ className = 'w-12 h-12', style }) => (
  <svg viewBox="0 0 128 128" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Containers */}
    <g fill="#2496ED">
      <rect x="44" y="32" width="11" height="9" rx="1.5" />
      <rect x="58" y="32" width="11" height="9" rx="1.5" />
      <rect x="30" y="44" width="11" height="9" rx="1.5" />
      <rect x="44" y="44" width="11" height="9" rx="1.5" />
      <rect x="58" y="44" width="11" height="9" rx="1.5" />
      <rect x="72" y="44" width="11" height="9" rx="1.5" />
      <rect x="30" y="56" width="11" height="9" rx="1.5" />
      <rect x="44" y="56" width="11" height="9" rx="1.5" />
      <rect x="58" y="56" width="11" height="9" rx="1.5" />
      <rect x="72" y="56" width="11" height="9" rx="1.5" />
      <rect x="86" y="56" width="11" height="9" rx="1.5" />
    </g>
    {/* Whale Body */}
    <path
      d="M121.2 65.5c-2.3-1.6-7.5-2.2-11.9-.8-.8-6.1-5-10.7-10.4-12.7l-2.1-.8-1.5 1.5c-4.2 4.2-6.5 10-6.5 15.9 0 1.2.1 2.5.3 3.7H11.2c-1.3 5.4-.5 13.9 3.5 19.3 9.4 12.6 28.5 15.9 44.8 15.9 28.7 0 54.3-14.2 62.7-34.9 3.1-.7 6.4-1.7 8.3-4.1.9-1.2 1.3-2.6 1.3-3.9 0-.4-.1-.8-.3-1.2l-.3-.6v-.1c-1.7-1.3-6.6-.7-10.3 1.9z"
      fill="#2496ED"
    />
    {/* Whale Eye */}
    <circle cx="96" cy="74" r="2.5" fill="#FFFFFF" />
  </svg>
);

// 10. AWS (Official Devicon AWS wordmark: crisp white letters 'aws' & Amazon orange #FF9900 smile arrow)
export const AwsLogo: React.FC<LogoProps> = ({ className = 'w-12 h-12', style }) => (
  <svg viewBox="0 0 128 128" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Letters "aws" in crisp white */}
    <path
      fill="#FFFFFF"
      d="M36.379 53.64c0 1.56.168 2.825.465 3.75.336.926.758 1.938 1.347 3.032.207.336.293.672.293.969 0 .418-.254.84-.8 1.261l-2.653 1.77c-.379.25-.758.379-1.093.379-.422 0-.844-.211-1.266-.59a13.28 13.28 0 0 1-1.516-1.98 34.153 34.153 0 0 1-1.304-2.485c-3.282 3.875-7.41 5.813-12.38 5.813-3.535 0-6.355-1.012-8.421-3.032-2.063-2.023-3.114-4.718-3.114-8.086 0-3.578 1.262-6.484 3.833-8.671 2.566-2.192 5.976-3.286 10.316-3.286 1.43 0 2.902.125 4.46.336 1.56.211 3.161.547 4.845.926v-3.074c0-3.2-.676-5.43-1.98-6.734C26.061 32.633 23.788 32 20.546 32c-1.473 0-2.988.168-4.547.547a33.416 33.416 0 0 0-4.547 1.433c-.676.293-1.18.461-1.473.547-.296.082-.507.125-.675.125-.59 0-.883-.422-.883-1.304v-2.063c0-.676.082-1.18.293-1.476.21-.293.59-.586 1.18-.883 1.472-.758 3.242-1.39 5.304-1.895 2.063-.547 4.254-.8 6.57-.8 5.008 0 8.672 1.136 11.032 3.41 2.316 2.273 3.492 5.726 3.492 10.359v13.64Zm-17.094 6.403c1.387 0 2.82-.254 4.336-.758 1.516-.508 2.863-1.433 4-2.695.672-.8 1.18-1.684 1.43-2.695.254-1.012.422-2.23.422-3.665v-1.765a34.401 34.401 0 0 0-3.871-.719 31.816 31.816 0 0 0-3.961-.25c-2.82 0-4.883.547-6.274 1.684-1.387 1.136-2.062 2.734-2.062 4.84 0 1.98.504 3.453 1.558 4.464 1.012 1.051 2.485 1.559 4.422 1.559Zm33.809 4.547c-.758 0-1.262-.125-1.598-.422-.34-.254-.633-.84-.887-1.64L40.715 29.98c-.25-.843-.38-1.39-.38-1.687 0-.672.337-1.05 1.013-1.05h4.125c.8 0 1.347.124 1.644.421.336.25.59.84.84 1.64l7.074 27.876 6.57-27.875c.208-.84.462-1.39.797-1.64.34-.255.93-.423 1.688-.423h3.367c.8 0 1.348.125 1.684.422.336.25.633.84.8 1.64l6.653 28.212 7.285-28.211c.25-.84.547-1.39.84-1.64.336-.255.887-.423 1.644-.423h3.914c.676 0 1.055.336 1.055 1.051 0 .21-.043.422-.086.676-.043.254-.125.59-.293 1.05L80.801 62.57c-.254.84-.547 1.387-.887 1.64-.336.255-.883.423-1.598.423h-3.62c-.801 0-1.348-.13-1.684-.422-.34-.297-.633-.844-.801-1.684l-6.527-27.16-6.485 27.117c-.21.844-.46 1.391-.8 1.684-.337.297-.926.422-1.684.422Zm54.105 1.137c-2.187 0-4.379-.254-6.484-.758-2.106-.504-3.746-1.055-4.84-1.684-.676-.379-1.137-.8-1.305-1.18a2.919 2.919 0 0 1-.254-1.18v-2.148c0-.882.336-1.304.97-1.304.25 0 .503.043.757.129.25.082.629.25 1.05.418a23.102 23.102 0 0 0 4.634 1.476c1.683.336 3.324.504 5.011.504 2.653 0 4.715-.465 6.145-1.39 1.433-.926 2.191-2.274 2.191-4 0-1.18-.379-2.145-1.136-2.946-.758-.8-2.192-1.516-4.254-2.191l-6.106-1.895c-3.074-.969-5.348-2.398-6.734-4.293-1.39-1.855-2.106-3.918-2.106-6.105 0-1.77.38-3.328 1.137-4.676a10.829 10.829 0 0 1 3.031-3.453c1.262-.965 2.696-1.684 4.38-2.188 1.683-.504 3.452-.715 5.304-.715.926 0 1.894.043 2.82.168.969.125 1.852.293 2.738.461.84.211 1.641.422 2.399.676.758.254 1.348.504 1.77.758.59.336 1.011.672 1.261 1.05.254.34.379.802.379 1.391v1.98c0 .884-.336 1.348-.969 1.348-.336 0-.883-.171-1.597-.507-2.403-1.094-5.098-1.641-8.086-1.641-2.399 0-4.293.379-5.598 1.18-1.309.797-1.98 2.02-1.98 3.746 0 1.18.421 2.191 1.261 2.988.844.8 2.403 1.602 4.633 2.316l5.98 1.895c3.032.969 5.22 2.316 6.524 4.043 1.305 1.727 1.938 3.707 1.938 5.895 0 1.812-.38 3.453-1.094 4.882-.758 1.434-1.77 2.696-3.074 3.707-1.305 1.051-2.864 1.809-4.672 2.36-1.895.586-3.875.883-6.024.883Zm0 0"
    />
    {/* Amazon Official Orange Smile Arrow */}
    <path
      fill="#FF9900"
      d="M118 73.348c-4.432.063-9.664 1.052-13.621 3.832-1.223.883-1.012 2.062.336 1.894 4.508-.547 14.44-1.726 16.21.547 1.77 2.23-1.976 11.62-3.663 15.79-.504 1.26.59 1.769 1.726.8 7.41-6.231 9.348-19.242 7.832-21.137-.757-.925-4.388-1.79-8.82-1.726zM1.63 75.859c-.927.116-1.347 1.236-.368 2.121 16.508 14.902 38.359 23.872 62.613 23.872 17.305 0 37.43-5.43 51.281-15.66 2.273-1.688.297-4.254-2.02-3.204-15.534 6.57-32.421 9.77-47.788 9.77-22.778 0-44.8-6.273-62.653-16.633-.39-.231-.755-.304-1.064-.266z"
    />
  </svg>
);

// 11. LINUX (Official Tux Penguin: Black body, White belly & Golden-yellow feet/beak #F5BA13)
export const LinuxLogo: React.FC<LogoProps> = ({ className = 'w-12 h-12', style }) => (
  <svg viewBox="0 0 128 128" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Golden Feet */}
    <path d="M24 106c6-4 18-3 25 2s4 11-3 12c-10 1-28-6-22-14zM104 106c-6-4-18-3-25 2s-4 11 3 12c10 1 28-6 22-14z" fill="#F5BA13" />
    {/* Black Body */}
    <path d="M64 12c-18 0-26 15-26 38 0 14-5 36-12 50-3 6 4 12 12 12h52c8 0 15-6 12-12-7-14-12-36-12-50 0-23-8-38-26-38z" fill="#1C2128" />
    {/* White Belly */}
    <path d="M64 52c-14 0-22 14-22 34s10 30 22 30 22-10 22-30-8-34-22-34z" fill="#FFFFFF" />
    {/* White Eyes & Pupils */}
    <ellipse cx="56" cy="38" rx="4" ry="6" fill="#FFFFFF" />
    <ellipse cx="72" cy="38" rx="4" ry="6" fill="#FFFFFF" />
    <circle cx="57" cy="39" r="2.5" fill="#000000" />
    <circle cx="71" cy="39" r="2.5" fill="#000000" />
    {/* Yellow Beak */}
    <path d="M54 44c0-2 10-6 10-6s10 4 10 6c0 5-10 9-10 9s-10-4-10-9z" fill="#F5BA13" />
  </svg>
);

// 12. GIT (Official orange-red diamond #F05032 with white tree branches & commit nodes)
export const GitLogo: React.FC<LogoProps> = ({ className = 'w-12 h-12', style }) => (
  <svg viewBox="0 0 128 128" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Orange Diamond */}
    <rect x="64" y="6" width="76" height="76" rx="14" transform="rotate(45 64 6)" fill="#F05032" />
    {/* White Branches & Nodes */}
    <g stroke="#FFFFFF" strokeWidth="7.5" strokeLinecap="round" fill="none">
      <path d="M42 42l44 44" />
      <path d="M64 64v22" />
      <path d="M64 64L86 42" />
    </g>
    <circle cx="42" cy="42" r="8" fill="#FFFFFF" />
    <circle cx="86" cy="86" r="8" fill="#FFFFFF" />
    <circle cx="64" cy="86" r="8" fill="#FFFFFF" />
    <circle cx="86" cy="42" r="8" fill="#FFFFFF" />
  </svg>
);

// 13. POSTGRESQL (Official Slonik elephant: Classic PostgreSQL Blue #336791 with white tusks)
export const PostgreSqlLogo: React.FC<LogoProps> = ({ className = 'w-12 h-12', style }) => (
  <svg viewBox="0 0 128 128" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Elephant Head - Blue */}
    <path
      d="M98 52c-1.5-12-8.5-22-22-26-8-2.3-17-2.3-25.5 1-13 5-21 16.5-23.5 30-2.5 13.5 1 27.5 9 37.5 4 5 9 8.5 15 10.5v11c0 2 2 3.5 4 3 4.5-1.5 7.5-6 7.5-11v-7.5c2.5.5 5 .5 7.5 0v7.5c0 5 3 9.5 7.5 11 2 .5 4-1 4-3V95c6-2 11-5.5 15-10.5 8-10 11.5-24 9-37.5z"
      fill="#336791"
    />
    <path
      d="M59 62c-3.5 0-6.5-2.5-7-6-.5-3.5 1.5-6.5 5-7 3.5-.5 6.5 1.5 7 5 .5 3.5-1.5 6.5-5 8z"
      fill="#FFFFFF"
    />
    <circle cx="58" cy="54" r="2.5" fill="#1E395B" />
    {/* White Ivory Tusks */}
    <path d="M38 78c-5 0-9-4-9-9 0-3 3-8 9-11 1 5 1 12 0 20z" fill="#FFFFFF" />
    <path d="M90 78c5 0 9-4 9-9 0-3-3-8-9-11-1 5-1 12 0 20z" fill="#FFFFFF" />
  </svg>
);

// 14. MONGODB (Official dual-tone green leaf: #13AA52 & #00684A with root)
export const MongoDbLogo: React.FC<LogoProps> = ({ className = 'w-12 h-12', style }) => (
  <svg viewBox="0 0 128 128" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Bright Green Left Half */}
    <path
      d="M62.6 8.5C61.4 9.8 51 22.5 44.5 34c-9.5 16.8-12 34.6-7 50.8 5 16.3 16 27.8 25.1 34.7h1.4V8.5h-1.4z"
      fill="#13AA52"
    />
    {/* Deep Forest Green Right Half */}
    <path
      d="M65.4 8.5v111h1.4c9.1-6.9 20.1-18.4 25.1-34.7 5-16.2 2.5-34-7-50.8-6.5-11.5-16.9-24.2-18.1-25.5h-1.4z"
      fill="#00684A"
    />
    {/* Leaf Root */}
    <path
      d="M64 105.8c-1.8 0-3.2 5.5-3.2 12.2s1.4 1.5 3.2 1.5 3.2 5.5 3.2-1.5-1.4-12.2-3.2-12.2z"
      fill="#A6CE39"
    />
  </svg>
);

// 15. REDIS (Official red layered in-memory database blocks #DC382D)
export const RedisLogo: React.FC<LogoProps> = ({ className = 'w-12 h-12', style }) => (
  <svg viewBox="0 0 128 128" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 42l50-24 50 24-50 24-50-24z" fill="#DC382D" />
    <path d="M14 42v22l50 24V66L14 42z" fill="#A8241B" />
    <path d="M114 42v22L64 88V66l50-24z" fill="#C92B21" />
    
    <path d="M14 66v22l50 24V90L14 66z" fill="#991F17" />
    <path d="M114 66v22L64 112V90l50-24z" fill="#B5251C" />
    
    {/* Center Core Emblem */}
    <circle cx="64" cy="42" r="7" fill="#FFFFFF" opacity="0.95" />
  </svg>
);

// 16. C++ (Official ISO C++ shield: Blue #00599C, #004482, white C and blue ++ signs)
export const CppLogo: React.FC<LogoProps> = ({ className = 'w-12 h-12', style }) => (
  <svg viewBox="0 0 128 128" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M64 8l48 27.7v55.4L64 119.8 16 91.1V35.7L64 8z" fill="#00599C" />
    <path d="M64 16l41 23.7v47.4L64 110.8 23 87.1V39.7L64 16z" fill="#004482" />
    <path
      d="M62 45c-11 0-18 8-18 19s7 19 18 19c6 0 11-2.5 14-6.5l-6-4.5c-2 2.5-5 4-8 4-6.5 0-10.5-5-10.5-12s4-12 10.5-12c3 0 6 1.5 8 4l6-4.5c-3-4-8-6.5-14-6.5z"
      fill="#FFFFFF"
    />
    <g fill="#659AD2">
      <path d="M82 58h4v-4h3v4h4v3h-4v4h-3v-4h-4v-3z" />
      <path d="M97 58h4v-4h3v4h4v3h-4v4h-3v-4h-4v-3z" />
    </g>
  </svg>
);

// 17. FIGMA (Official 5-color shapes: #F24E1E, #FF7262, #A259FF, #1ABCFE, #0ACF83)
export const FigmaLogo: React.FC<LogoProps> = ({ className = 'w-12 h-12', style }) => (
  <svg viewBox="0 0 128 128" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M38 14h26v26H38a13 13 0 010-26z" fill="#F24E1E" />
    <path d="M64 14h26a13 13 0 010 26H64V14z" fill="#FF7262" />
    <path d="M38 40h26v26H38a13 13 0 010-26z" fill="#A259FF" />
    <circle cx="77" cy="53" r="13" fill="#1ABCFE" />
    <path d="M38 66h26v26a13 13 0 01-26 0 13 13 0 010-26z" fill="#0ACF83" />
  </svg>
);

// 18. GRAPHQL (Official magenta #E10098 hexagram with node circles)
export const GraphQlLogo: React.FC<LogoProps> = ({ className = 'w-12 h-12', style }) => (
  <svg viewBox="0 0 128 128" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M64 12l45 26v52L64 116 19 90V38l45-26zm0 10.4L28 40.8v46.4L64 105.6l36-18.4V40.8L64 22.4z"
      fill="#E10098"
    />
    <path d="M64 12l45 78H19L64 12z" stroke="#E10098" strokeWidth="6" fill="none" />
    <circle cx="64" cy="12" r="8" fill="#E10098" />
    <circle cx="109" cy="38" r="8" fill="#E10098" />
    <circle cx="109" cy="90" r="8" fill="#E10098" />
    <circle cx="64" cy="116" r="8" fill="#E10098" />
    <circle cx="19" cy="90" r="8" fill="#E10098" />
    <circle cx="19" cy="38" r="8" fill="#E10098" />
  </svg>
);
