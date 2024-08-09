import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowDownUp,
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  ArrowUpRight,
  BadgePlus,
  Biohazard,
  CalendarClock,
  CandlestickChart,
  Check,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsDown,
  ChevronsRight,
  ChevronsUp,
  Circle,
  ClipboardCheck,
  Clock,
  Clock8,
  Coins,
  Command,
  Copy,
  CreditCard,
  Download,
  Edit,
  Expand,
  ExternalLink,
  File,
  FileEdit,
  FileText,
  Filter,
  Frame,
  Fuel,
  Globe,
  Hammer,
  HeartHandshake,
  HelpCircle,
  HelpingHand,
  Image,
  Inbox,
  Info,
  InfoIcon,
  Laptop,
  LayoutDashboard,
  LineChart,
  Link,
  Link2,
  List,
  Loader2,
  Lock,
  LogOut,
  Medal,
  Menu,
  Minus,
  MinusSquare,
  Moon,
  MoreVertical,
  MoveRight,
  Newspaper,
  PenSquare,
  PieChart,
  Pizza,
  Droplet,
  Play,
  Plus,
  PlusCircle,
  PlusSquare,
  Redo,
  RefreshCcw,
  Repeat,
  Repeat2,
  Reply,
  SearchIcon,
  Settings,
  SortAsc,
  SortDesc,
  SunMedium,
  Ticket,
  Timer,
  TimerReset,
  Trash,
  Trash2,
  Twitter,
  Unlock,
  User,
  UserPlus,
  UserX,
  Wallet,
  X,
  XCircle,
  XOctagon,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

import { FavIcons } from "./fav-icons";
import { WalletTxnIcons } from "./wallet-txn-icons";

export type Icon = LucideIcon;

export const Icons = {
  badgePlus: BadgePlus,
  filter: Filter,
  fileEdit: FileEdit,
  lineChart: LineChart,
  pieChart: PieChart,
  alertCircle: AlertCircle,
  activity: Activity,
  reply: Reply,
  clock: Clock,
  minusSquare: MinusSquare,
  plusSquare: PlusSquare,
  sortAsc: SortAsc,
  arrowUpDown: ArrowUpDown,
  arrowDownUp: ArrowDownUp,
  arrowLeft: ArrowLeft,
  sortDesc: SortDesc,
  command: Command,
  chevronsRight: ChevronsRight,
  clock8: Clock8,
  list: List,
  layoutDashboard: LayoutDashboard,
  close: X,
  coins: Coins,
  redo: Redo,
  menu: Menu,
  subtract: Minus,
  circle: Circle,
  xCircle: XCircle,
  newspaper: Newspaper,
  spinner: Loader2,
  chevronsDown: ChevronsDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronUp: ChevronUp,
  chevronsUp: ChevronsUp,
  chevronDown: ChevronDown,
  edit: Edit,
  download: Download,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  expand: Expand,
  externalLink: ExternalLink,
  link: Link,
  link2: Link2,
  ticket: Ticket,
  add: Plus,
  minus: Minus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  timer: Timer,
  timerReset: TimerReset,
  arrowDown: ArrowDown,
  help: HelpCircle,
  pizza: Pizza,
  twitter: Twitter,
  check: Check,
  copy: Copy,
  copyDone: ClipboardCheck,
  sun: SunMedium,
  moon: Moon,
  swap: Repeat2,
  repeat: Repeat,
  laptop: Laptop,
  tooltip: Info,
  wallet: Wallet,
  play: Play,
  frame: Frame,
  lock: Lock,
  unlock: Unlock,
  trash2: Trash2,
  empty: Inbox,
  info: InfoIcon,
  disconnect: LogOut,
  search: SearchIcon,
  userX: UserX,
  external: ArrowUpRight,
  userPlus: UserPlus,
  hammer: Hammer,
  XOctagon: XOctagon,
  helpingHand: HelpingHand,
  checkCircle: CheckCircle2,
  checkCircle2: CheckCircle,
  plus: Plus,
  candleStick: CandlestickChart,
  medal: Medal,
  plusCircle: PlusCircle,
  penSquare: PenSquare,
  heartHandShake: HeartHandshake,
  calendarClock: CalendarClock,
  fuel: Fuel,
  globe: Globe,
  moveRight: MoveRight,
  refreshccw: RefreshCcw,
  biohazard: Biohazard,
  droplet: Droplet,
  vault: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
      <path d="m7.9 7.9 2.7 2.7" />
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
      <path d="m13.4 10.6 2.7-2.7" />
      <circle cx="7.5" cy="16.5" r=".5" fill="currentColor" />
      <path d="m7.9 16.1 2.7-2.7" />
      <circle cx="16.5" cy="16.5" r=".5" fill="currentColor" />
      <path d="m13.4 13.4 2.7 2.7" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  system: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        d="m11.998 2c5.517 0 9.997 4.48 9.997 9.998 0 5.517-4.48 9.997-9.997 9.997-5.518 0-9.998-4.48-9.998-9.997 0-5.518 4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.497 8.498 8.497z"
        fillRule="nonzero"
        fill="currentColor"
      />
    </svg>
  ),
  bnb: (props: LucideProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="12" fill="black" />
      <path
        d="M18.9714 14.516C18.9611 12.9667 17.9064 10.6582 17.9064 10.6582C17.9064 10.6582 20.0671 8.28821 17.9372 6.12338C16.0837 4.24582 13.749 6.37988 13.749 6.37988C13.749 6.37988 13.4725 6.21572 12.9196 6.0926C12.2437 5.94896 11.7215 5.94896 11.0456 6.0926C10.4927 6.20546 10.2162 6.37988 10.2162 6.37988C10.2162 6.37988 7.87124 4.24582 6.02804 6.12338C3.89812 8.28821 6.05875 10.6582 6.05875 10.6582C6.05875 10.6582 5.01428 12.9667 4.9938 14.516C4.98356 16.2191 5.51604 17.676 8.22964 18.2711C8.82356 18.4045 9.42771 18.4865 10.0114 18.5378C10.0114 18.5378 10.2879 18.5686 10.7589 18.5891C10.7794 18.5891 10.7896 18.5891 10.8101 18.5891C11.2095 18.6096 11.5986 18.6199 11.9468 18.6199C11.957 18.6199 11.9672 18.6199 11.9775 18.6199C11.9877 18.6199 11.998 18.6199 12.0082 18.6199C12.3564 18.6199 12.7455 18.6096 13.1448 18.5891C13.1653 18.5891 13.1756 18.5891 13.196 18.5891C13.6671 18.5686 13.9436 18.5378 13.9436 18.5378C14.5272 18.4865 15.1314 18.3942 15.7253 18.2711C18.4594 17.6863 18.9816 16.2191 18.9714 14.516Z"
        fill="#FBF1A2"
      />
      <path
        d="M14.7626 14.6079C15.775 14.6079 16.5956 13.1931 16.5956 11.4479C16.5956 9.70264 15.775 8.28784 14.7626 8.28784C13.7503 8.28784 12.9297 9.70264 12.9297 11.4479C12.9297 13.1931 13.7503 14.6079 14.7626 14.6079Z"
        fill="black"
      />
      <path
        d="M9.10005 14.6079C10.1124 14.6079 10.933 13.1931 10.933 11.4479C10.933 9.70264 10.1124 8.28784 9.10005 8.28784C8.08774 8.28784 7.26709 9.70264 7.26709 11.4479C7.26709 13.1931 8.08774 14.6079 9.10005 14.6079Z"
        fill="black"
      />
    </svg>
  ),
  bera: (props: LucideProps) => (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_dd_9857_4125)">
        <path
          d="M37.3263 17.6181C37.2662 17.4169 37.2242 17.2105 37.1918 17.0021C37.1769 16.9055 37.1596 16.8095 37.1398 16.7141C37.0971 16.5069 37.0494 16.3007 36.998 16.0958C37.8496 14.7185 41.9208 7.53485 37.2881 2.9244C32.1464 -2.19255 26.1387 4.51441 26.1387 4.51441L26.1574 4.54419C23.4571 3.66765 20.5293 3.56474 17.6808 4.51412C17.6456 4.4748 11.6577 -2.17752 6.53111 2.9244C1.40292 8.02805 6.94056 16.2848 6.96951 16.3279C6.91052 16.5219 6.86289 16.7205 6.8315 16.9217C6.27673 20.455 2.5 21.5455 2.5 27.7C2.5 33.8545 6.45101 38.9168 14.5154 38.9168H17.8245C17.8394 38.9393 19.2022 41.0023 21.9999 41C24.597 40.998 26.3122 38.9344 26.327 38.9168H29.4846C37.549 38.9168 41.5 33.9733 41.5 27.7C41.5 21.9687 38.2244 20.6288 37.3263 17.6181Z"
          fill="#F1EBE4"
        />
        <path
          d="M37.3263 17.6181C37.2662 17.4169 37.2242 17.2105 37.1918 17.0021C37.1769 16.9055 37.1596 16.8095 37.1398 16.7141C37.0971 16.5069 37.0494 16.3007 36.998 16.0958C37.8496 14.7185 41.9208 7.53485 37.2881 2.9244C32.1464 -2.19255 26.1387 4.51441 26.1387 4.51441L26.1574 4.54419C23.4571 3.66765 20.5293 3.56474 17.6808 4.51412C17.6456 4.4748 11.6577 -2.17752 6.53111 2.9244C1.40292 8.02805 6.94056 16.2848 6.96951 16.3279C6.91052 16.5219 6.86289 16.7205 6.8315 16.9217C6.27673 20.455 2.5 21.5455 2.5 27.7C2.5 33.8545 6.45101 38.9168 14.5154 38.9168H17.8245C17.8394 38.9393 19.2022 41.0023 21.9999 41C24.597 40.998 26.3122 38.9344 26.327 38.9168H29.4846C37.549 38.9168 41.5 33.9733 41.5 27.7C41.5 21.9687 38.2244 20.6288 37.3263 17.6181Z"
          fill="#DEB69A"
        />
      </g>
      <defs>
        <filter
          id="filter0_dd_9857_4125"
          x="0.5"
          y="0"
          width="43"
          height="44"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_9857_4125"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_9857_4125"
            result="effect2_dropShadow_9857_4125"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_9857_4125"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  ),
  beraIcon: (props: LucideProps) => (
    <svg
      {...props}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="16" height="16" fill="url(#pattern0_8115_8769)" />
      <defs>
        <pattern
          id="pattern0_8115_8769"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_8115_8769" transform="scale(0.00416667)" />
        </pattern>
        <image
          id="image0_8115_8769"
          width="240"
          height="240"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  ),
  bee: (props: LucideProps) => (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity="0.5"
        d="M28.32 26.16C29.24 28.56 28.94 30.8 27.42 32.88C25.9 34.96 23.76 36 21 36C19.68 36 18.43 35.66 17.25 34.98C16.07 34.3 15.2 33.4 14.64 32.28C11.32 32.76 8.57 31.91 6.39 29.73C4.21 27.55 3.32 24.76 3.72 21.36C2.52 20.68 1.6 19.75 0.96 18.57C0.32 17.39 0 16.04 0 14.52C0 12.08 1.11 10.11 3.33 8.61C5.55 7.11 7.72 6.8 9.84 7.68L13.56 9.24C14.36 8 15.42 6.99 16.74 6.21C18.06 5.43 19.48 5 21 4.92V1.8C21 1.28 21.17 0.85 21.51 0.51C21.85 0.17 22.28 0 22.8 0C23.32 0 23.75 0.17 24.09 0.51C24.43 0.85 24.6 1.28 24.6 1.8V5.4C26.08 5.84 27.3 6.53 28.26 7.47C29.22 8.41 30.04 9.72 30.72 11.4H34.2C34.72 11.4 35.15 11.57 35.49 11.91C35.83 12.25 36 12.68 36 13.2C36 13.72 35.83 14.15 35.49 14.49C35.15 14.83 34.72 15 34.2 15H31.08C31 16.52 30.59 17.94 29.85 19.26C29.11 20.58 28.12 21.64 26.88 22.44L28.32 26.16ZM13.44 27.6C13.44 26.52 13.53 25.47 13.71 24.45C13.89 23.43 14.16 22.44 14.52 21.48C13.6 21.92 12.61 22.23 11.55 22.41C10.49 22.59 9.44 22.64 8.4 22.56C8.4 24.12 8.85 25.35 9.75 26.25C10.65 27.15 11.88 27.6 13.44 27.6ZM9 17.76C10.28 17.76 11.41 17.6 12.39 17.28C13.37 16.96 14.64 16.32 16.2 15.36L9 12.36C7.84 11.88 6.85 11.89 6.03 12.39C5.21 12.89 4.8 13.68 4.8 14.76C4.8 15.8 5.14 16.56 5.82 17.04C6.5 17.52 7.56 17.76 9 17.76ZM21 31.2C22 31.2 22.81 30.85 23.43 30.15C24.05 29.45 24.2 28.72 23.88 27.96L20.64 19.8C19.88 21.08 19.29 22.36 18.87 23.64C18.45 24.92 18.24 26.08 18.24 27.12C18.24 28.44 18.47 29.45 18.93 30.15C19.39 30.85 20.08 31.2 21 31.2ZM24.96 17.88C25.36 17.48 25.68 16.95 25.92 16.29C26.16 15.63 26.28 14.94 26.28 14.22C26.28 12.94 25.86 11.86 25.02 10.98C24.18 10.1 23.14 9.66 21.9 9.66C21.18 9.66 20.5 9.78 19.86 10.02C19.22 10.26 18.68 10.6 18.24 11.04L22.92 13.2L24.96 17.88Z"
        fill="#FFB303"
      />
    </svg>
  ),
  chain: (props: LucideProps) => (
    <svg
      width="40"
      height="44"
      viewBox="0 0 40 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_9857_4154)">
        <path
          d="M11.6841 33.6517V28.8641C14.6309 27.8534 16.7767 24.7149 16.7767 21C16.7767 17.2852 14.6309 14.1378 11.6841 13.136V8.34836C14.4593 7.39971 16.5287 4.55375 16.7576 1.11377H13.3816V2.57665C13.3816 3.70262 12.695 4.6956 11.6841 5.19209V4.50942C11.6841 3.50757 10.8067 2.6919 9.72906 2.6919H9.5574C8.47975 2.6919 7.60237 3.50757 7.60237 4.50942V5.19209C6.59148 4.6956 5.90483 3.71149 5.90483 2.57665V1.11377H2.52884C2.75772 4.55375 4.82719 7.39971 7.60237 8.34836V13.136C4.66506 14.1378 2.50977 17.2764 2.50977 21C2.50977 24.7237 4.65553 27.8623 7.60237 28.8641V33.6517C4.82719 34.6004 2.75772 37.4463 2.52884 40.8863H5.90483V39.4234C5.90483 38.2975 6.59148 37.3045 7.60237 36.808V37.4907C7.60237 38.4925 8.47975 39.3082 9.5574 39.3082H9.72906C10.8067 39.3082 11.6841 38.4925 11.6841 37.4907V36.808C12.695 37.3045 13.3816 38.2886 13.3816 39.4234V40.8863H16.7576C16.5287 37.4463 14.4593 34.6004 11.6841 33.6517ZM5.90483 23.0924V18.8988C5.90483 17.7728 6.59148 16.7799 7.60237 16.2834V16.966C7.60237 17.9679 8.47975 18.7836 9.5574 18.7836H9.72906C10.8067 18.7836 11.6841 17.9679 11.6841 16.966V16.2834C12.695 16.7799 13.3816 17.764 13.3816 18.8988V23.0924C13.3816 24.2184 12.695 25.2113 11.6841 25.7078V25.0252C11.6841 24.0233 10.8067 23.2077 9.72906 23.2077H9.5574C8.47975 23.2077 7.60237 24.0233 7.60237 25.0252V25.7078C6.60102 25.2113 5.90483 24.2272 5.90483 23.0924Z"
          fill="#EBE9E7"
        />
      </g>
      <g filter="url(#filter1_d_9857_4154)">
        <path
          d="M32.3977 23.5446V18.4467C35.3445 17.4359 37.4903 14.2974 37.4903 10.5826C37.4903 6.86775 35.3445 3.72035 32.3977 2.7185V1.11377H28.3255V2.7185C25.3787 3.72922 23.2329 6.86775 23.2329 10.5826C23.2329 14.2974 25.3787 17.4448 28.3255 18.4467V23.5446C25.3787 24.5553 23.2329 27.6938 23.2329 31.4086C23.2329 35.1235 25.3787 38.2709 28.3255 39.2727V40.8774H32.3977V39.2727C35.3445 38.262 37.4903 35.1235 37.4903 31.4086C37.4903 27.6938 35.3445 24.5553 32.3977 23.5446ZM26.6184 12.6749V8.48135C26.6184 7.35538 27.3051 6.3624 28.316 5.8659V6.54858C28.316 7.55043 29.1934 8.3661 30.271 8.3661H30.4331C31.5108 8.3661 32.3881 7.55043 32.3881 6.54858V5.8659C33.399 6.3624 34.0857 7.34651 34.0857 8.48135V12.6749C34.0857 13.8009 33.399 14.7939 32.3881 15.2904V14.6077C32.3881 13.6059 31.5108 12.7902 30.4331 12.7902H30.2615C29.1838 12.7902 28.3064 13.6059 28.3064 14.6077V15.2904C27.3146 14.7939 26.6184 13.8098 26.6184 12.6749ZM34.0952 33.5099C34.0952 34.6358 33.4086 35.6288 32.3977 36.1253V35.1235C32.3977 34.1216 31.5203 33.3059 30.4427 33.3059H30.2805C29.2029 33.3059 28.3255 34.1216 28.3255 35.1235V36.1253C27.3146 35.6288 26.628 34.6447 26.628 33.5099V29.3163C26.628 28.1903 27.3146 27.1973 28.3255 26.7008V27.0643C28.3255 28.0662 29.2029 28.8818 30.2805 28.8818H30.4522C31.5298 28.8818 32.4072 28.0662 32.4072 27.0643V26.7008C33.4181 27.1973 34.1048 28.1814 34.1048 29.3163V33.5099H34.0952Z"
          fill="#EBE9E7"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_9857_4154"
          x="0.509766"
          y="0.11377"
          width="18.2671"
          height="43.7725"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_9857_4154"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_9857_4154"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_9857_4154"
          x="21.2329"
          y="0.11377"
          width="18.2573"
          height="43.7637"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_9857_4154"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_9857_4154"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  ),
  logo: (props: LucideProps) => (
    <svg
      version="1.1"
      id="BerachainLogo_00000018929794027939594590000007353334887120773283_"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 3238.5 1608"
      enableBackground="new 0 0 3238.5 1608"
      xmlSpace="preserve"
      {...props}
    >
      <g id="BerachainLogo">
        <path
          fill="currentColor"
          d="M1286.9,687.3c-2.2-7-3.8-14.1-5-21.3c-0.6-3.3-1.2-6.7-1.9-10c-1.6-7.2-3.3-14.3-5.2-21.4v0
		c31.5-47.6,181.9-296.1,10.7-455.6c-190-177-412,55-412,55l0.7,1c-99.8-30.3-208-33.9-313.2-1c0,0,0,0,0,0
		c-1.3-1.4-222.5-231.5-412-55c-189.5,176.5,15.1,462.1,16.2,463.6c0,0,0,0,0,0c-2.2,6.7-3.9,13.6-5.1,20.5
		C139.6,785.4,0,823.1,0,1036s146,388,444,388h122.3c0,0,0,0,0,0c0.5,0.8,50.9,72.1,154.3,72.1c96-0.1,159.3-71.4,159.9-72.1
		c0,0,0,0,0,0h116.7c298,0,444-171,444-388C1441.2,837.8,1320.1,791.4,1286.9,687.3L1286.9,687.3z"
        />
        <path
          fill="currentColor"
          d="M3223.3,377c0,0,25.2-233.3-166.4-283.4V0h-148.3v91.2l0,0c-202.1,44.7-176,285.8-176,285.8v40
		c0,0-26.1,241.1,176.1,285.8h0v200.3c-213,38.8-186.1,287.8-186.1,287.8v40c0,0-26.1,241.1,176,285.8l0,0v91.2H3047v-93.6
		c191.6-50.1,166.4-283.4,166.4-283.4c8.4,0,15.2-6.8,15.2-15.2v-9.7c0-8.4-6.8-15.2-15.2-15.2c0,0,25-231.3-163.9-282.8l0,0V702.8
		h-2.2c202.1-44.7,176.1-285.8,176.1-285.8c8.4,0,15.2-6.8,15.2-15.2v-9.7C3238.5,383.8,3231.7,377,3223.3,377L3223.3,377z
		 M3102.4,1190.8h-13.6c-8.4,0-15.2,6.8-15.2,15.2v9.7c0,8.4,6.8,15.2,15.2,15.2h13.6c0,144.7-48.1,169.1-64.2,173.2
		c-2.7,0.7-5.2-1.3-5.2-4v-46.1c0-25.5-16.2-39.5-32.5-47.1c-20.5-9.6-44.5-9.6-65,0c-16.2,7.6-32.5,21.6-32.5,47.1v46.1
		c0,2.7-2.5,4.7-5.1,4.1c-16.1-4-64.3-28.2-64.3-173.2v-40c0-144.7,48.1-169.1,64.2-173.2c2.7-0.7,5.2,1.3,5.2,4v46.1
		c0,25.5,16.2,39.5,32.5,47.1c20.5,9.6,44.5,9.6,65,0c16.2-7.6,32.5-21.6,32.5-47.1v-46.1c0-2.7,2.5-4.7,5.1-4.1
		C3054.2,1021.7,3102.4,1045.9,3102.4,1190.8L3102.4,1190.8z M3098.9,417h13.6c0,145-48.2,169.2-64.3,173.2
		c-2.6,0.7-5.1-1.4-5.1-4.1V540c0-25.5-16.2-39.5-32.5-47.1c-20.5-9.6-44.5-9.6-65,0c-16.2,7.6-32.5,21.6-32.5,47.1v46.1
		c0,2.7-2.6,4.7-5.2,4c-16.2-4.1-64.2-28.5-64.2-173.2v-40c0-145,48.2-169.2,64.3-173.2c2.6-0.7,5.1,1.4,5.1,4.1V254
		c0,25.5,16.2,39.5,32.5,47.1c20.5,9.6,44.5,9.6,65,0c16.2-7.6,32.5-21.6,32.5-47.1v-46.1c0-2.7,2.6-4.7,5.2-4
		c16.2,4.1,64.2,28.4,64.2,173.2h-13.6c-8.4,0-15.2,6.8-15.2,15.2v9.7C3083.7,410.2,3090.5,417,3098.9,417z"
        />
        <path
          fill="currentColor"
          d="M2490.3,789c0,0,26.2-242.5-177.8-286.1V285c198.6-46.5,172.8-285,172.8-285S2374,0,2374.4,0
		c0,145-48.2,169.2-64.3,173.2c-2.6,0.7-5.1-1.4-5.1-4.1V123c0-25.5-16.2-39.5-32.5-47.1c-20.5-9.6-44.5-9.6-65,0
		c-16.2,7.6-32.5,21.6-32.5,47.1v46.1c0,2.7-2.6,4.7-5.2,4c-16.2-4.1-64.2-28.4-64.2-173.2c0.5,0-110.9,0-110.9,0
		s-26.7,247.5,184.2,287.4v215.1C1973.3,545.4,1999.6,789,1999.6,789v40c0,0-26.3,243.6,179.2,286.4v205.1
		c-210.9,39.9-184.2,287.4-184.2,287.4s111.3,0,110.9,0c0-145,48.2-169.2,64.3-173.2c2.6-0.7,5.1,1.4,5.1,4.1v46.1
		c0,25.5,16.2,39.5,32.5,47.1c20.5,9.6,44.5,9.6,65,0c16.2-7.6,32.5-21.6,32.5-47.1v-46.1c0-2.7,2.6-4.7,5.2-4
		c16.2,4.1,64.2,28.4,64.2,173.2c-0.5,0,110.9,0,110.9,0s25.8-238.5-172.8-285v-207.8c204-43.7,177.8-286.1,177.8-286.1
		c8.4,0,15.2-6.8,15.2-15.2v-9.7C2505.5,795.8,2498.7,789,2490.3,789L2490.3,789z M2365.9,829h13.6c0,145-48.2,169.2-64.3,173.2
		c-2.6,0.7-5.1-1.4-5.1-4.1V952c0-25.5-16.2-39.5-32.5-47.1c-20.5-9.6-44.5-9.6-65,0c-16.2,7.6-32.5,21.6-32.5,47.1v46.1
		c0,2.7-2.6,4.7-5.2,4c-16.2-4.1-64.2-28.5-64.2-173.2v-40c0-145,48.2-169.2,64.3-173.2c2.6-0.7,5.1,1.4,5.1,4.1V666
		c0,25.5,16.2,39.5,32.5,47.1c20.5,9.6,44.5,9.6,65,0c16.2-7.6,32.5-21.6,32.5-47.1v-46.1c0-2.7,2.6-4.7,5.2-4
		c16.2,4.1,64.2,28.5,64.2,173.2h-13.6c-8.4,0-15.2,6.8-15.2,15.2v9.7C2350.7,822.2,2357.5,829,2365.9,829L2365.9,829z"
        />
      </g>
    </svg>
  ),
  metamask: (props: LucideProps) => (
    <svg viewBox="0 0 40 40" {...props}>
      <path
        d="M36.0112 3.33337L22.1207 13.6277L24.7012 7.56091L36.0112 3.33337Z"
        fill="#E17726"
      />
      <path
        d="M4.00261 3.33337L17.7558 13.7238L15.2989 7.56091L4.00261 3.33337Z"
        fill="#E27625"
      />
      <path
        d="M31.0149 27.2023L27.3227 32.8573L35.2287 35.0397L37.4797 27.3258L31.0149 27.2023Z"
        fill="#E27625"
      />
      <path
        d="M2.53386 27.3258L4.77116 35.0397L12.6772 32.8573L8.9987 27.2023L2.53386 27.3258Z"
        fill="#E27625"
      />
      <path
        d="M12.2518 17.6496L10.0419 20.9712L17.8793 21.3281L17.6048 12.8867L12.2518 17.6496Z"
        fill="#E27625"
      />
      <path
        d="M27.762 17.6494L22.3129 12.7905L22.1207 21.3279L29.9581 20.9711L27.762 17.6494Z"
        fill="#E27625"
      />
      <path
        d="M12.6772 32.8574L17.3989 30.5652L13.336 27.3809L12.6772 32.8574Z"
        fill="#E27625"
      />
      <path
        d="M22.6009 30.5652L27.3226 32.8574L26.6637 27.3809L22.6009 30.5652Z"
        fill="#E27625"
      />
      <path
        d="M27.3226 32.8575L22.6009 30.5653L22.9715 33.6399L22.9303 34.9301L27.3226 32.8575Z"
        fill="#D5BFB2"
      />
      <path
        d="M12.6772 32.8575L17.0694 34.9301L17.042 33.6399L17.3989 30.5653L12.6772 32.8575Z"
        fill="#D5BFB2"
      />
      <path
        d="M17.1518 25.3495L13.2262 24.1965L15.9988 22.92L17.1518 25.3495Z"
        fill="#233447"
      />
      <path
        d="M22.848 25.3495L24.001 22.92L26.801 24.1965L22.848 25.3495Z"
        fill="#233447"
      />
      <path
        d="M12.6773 32.8573L13.3635 27.2023L8.99876 27.3258L12.6773 32.8573Z"
        fill="#CC6228"
      />
      <path
        d="M26.6364 27.2023L27.3227 32.8573L31.0149 27.3258L26.6364 27.2023Z"
        fill="#CC6228"
      />
      <path
        d="M29.9581 20.9709L22.1207 21.3278L22.8482 25.3495L24.0011 22.92L26.8012 24.1965L29.9581 20.9709Z"
        fill="#CC6228"
      />
      <path
        d="M13.2263 24.1965L15.9989 22.92L17.1519 25.3495L17.8793 21.3278L10.0419 20.9709L13.2263 24.1965Z"
        fill="#CC6228"
      />
      <path
        d="M10.0419 20.9709L13.3361 27.3809L13.2263 24.1965L10.0419 20.9709Z"
        fill="#E27525"
      />
      <path
        d="M26.8011 24.1965L26.6638 27.3809L29.958 20.9709L26.8011 24.1965Z"
        fill="#E27525"
      />
      <path
        d="M17.8793 21.3278L17.1519 25.3494L18.0715 30.0985L18.2637 23.8396L17.8793 21.3278Z"
        fill="#E27525"
      />
      <path
        d="M22.1205 21.3278L21.7499 23.8258L21.9283 30.0985L22.848 25.3494L22.1205 21.3278Z"
        fill="#E27525"
      />
      <path
        d="M22.848 25.3496L21.9284 30.0987L22.601 30.5654L26.6638 27.381L26.8011 24.1967L22.848 25.3496Z"
        fill="#F5841F"
      />
      <path
        d="M13.2262 24.1967L13.336 27.381L17.3989 30.5654L18.0714 30.0987L17.1518 25.3496L13.2262 24.1967Z"
        fill="#F5841F"
      />
      <path
        d="M22.9303 34.93L22.9715 33.6398L22.6284 33.3378H17.3714L17.042 33.6398L17.0694 34.93L12.6772 32.8574L14.2145 34.1202L17.3302 36.2751H22.6696L25.7853 34.1202L27.3226 32.8574L22.9303 34.93Z"
        fill="#C0AC9D"
      />
      <path
        d="M22.601 30.5653L21.9284 30.0986H18.0715L17.3989 30.5653L17.0421 33.6399L17.3715 33.3379H22.6285L22.9716 33.6399L22.601 30.5653Z"
        fill="#161616"
      />
      <path
        d="M36.5875 14.3003L37.7542 8.61779L36.011 3.33337L22.6009 13.2846L27.7618 17.6493L35.0365 19.7768L36.6424 17.8964L35.9424 17.3886L37.0679 16.3728L36.2169 15.7003L37.3287 14.863L36.5875 14.3003Z"
        fill="#763E1A"
      />
      <path
        d="M2.24573 8.61779L3.42615 14.3003L2.67123 14.863L3.78302 15.7003L2.93202 16.3728L4.05753 17.3886L3.35752 17.8964L4.96343 19.7768L12.2518 17.6493L17.399 13.2846L4.00263 3.33337L2.24573 8.61779Z"
        fill="#763E1A"
      />
      <path
        d="M35.0365 19.777L27.7619 17.6495L29.958 20.9712L26.6638 27.3811L31.0149 27.3262H37.4797L35.0365 19.777Z"
        fill="#F5841F"
      />
      <path
        d="M12.2517 17.6495L4.96332 19.777L2.53386 27.3262H8.99869L13.336 27.3811L10.0419 20.9712L12.2517 17.6495Z"
        fill="#F5841F"
      />
      <path
        d="M22.1205 21.3276L22.6009 13.2843L24.701 7.56067H15.2988L17.3988 13.2843L17.8792 21.3276L18.0577 23.8531L18.0714 30.0984H21.9283L21.9421 23.8531L22.1205 21.3276Z"
        fill="#F5841F"
      />
    </svg>
  ),
  walletConnect: (props: LucideProps) => (
    <svg viewBox="0 0 40 40" {...props}>
      <path
        d="M8.68096 12.4756C14.9323 6.39698 25.0677 6.39698 31.3191 12.4756L32.0714 13.2071C32.384 13.511 32.384 14.0038 32.0714 14.3077L29.4978 16.8103C29.3415 16.9622 29.0881 16.9622 28.9318 16.8103L27.8965 15.8036C23.5354 11.563 16.4647 11.563 12.1036 15.8036L10.9948 16.8817C10.8385 17.0336 10.5851 17.0336 10.4288 16.8817L7.85517 14.3791C7.54261 14.0752 7.54261 13.5824 7.85517 13.2785L8.68096 12.4756ZM36.6417 17.6511L38.9322 19.8783C39.2448 20.1823 39.2448 20.675 38.9322 20.979L28.6039 31.022C28.2913 31.3259 27.7846 31.3259 27.472 31.022C27.472 31.022 27.472 31.022 27.472 31.022L20.1416 23.8942C20.0634 23.8182 19.9367 23.8182 19.8586 23.8942C19.8586 23.8942 19.8586 23.8942 19.8586 23.8942L12.5283 31.022C12.2157 31.3259 11.709 31.3259 11.3964 31.022C11.3964 31.022 11.3964 31.022 11.3964 31.022L1.06775 20.9788C0.755186 20.6749 0.755186 20.1821 1.06775 19.8782L3.35833 17.6509C3.6709 17.347 4.17767 17.347 4.49024 17.6509L11.8208 24.7789C11.8989 24.8549 12.0256 24.8549 12.1038 24.7789C12.1038 24.7789 12.1038 24.7789 12.1038 24.7789L19.4339 17.6509C19.7465 17.347 20.2533 17.347 20.5658 17.6509C20.5658 17.6509 20.5658 17.6509 20.5658 17.6509L27.8964 24.7789C27.9745 24.8549 28.1012 24.8549 28.1794 24.7789L35.5098 17.6511C35.8223 17.3471 36.3291 17.3471 36.6417 17.6511Z"
        fill="#3389FB"
      />
    </svg>
  ),
  coinbase: (props: LucideProps) => (
    <svg viewBox="0 0 400 400" {...props}>
      <g stroke="none" fillRule="evenodd">
        <path
          d="M193.4 60.265C87.303 66.651 25.782 181.12 79.826 271.586c57.163 95.688 198.154 89.201 246.382-11.336C371.654 165.512 297.595 53.993 193.4 60.265m47.221 95.946c1.213.75 2.418 1.955 3.168 3.168l1.211 1.958v77.326l-1.211 1.958c-.75 1.213-1.955 2.418-3.168 3.168L238.663 245h-77.326l-1.958-1.211c-1.213-.75-2.418-1.955-3.168-3.168L155 238.663l-.119-37.831c-.08-25.344.018-38.306.297-39.267.685-2.365 2.559-4.562 4.876-5.717l2.127-1.06 38.241.106 38.241.106 1.958 1.211"
          fill="#fbfbfc"
        />
        <path
          d="M183.6.43C41.847 12.741-42.613 163.705 21.396 290.354c49.819 98.572 170.31 138.107 268.958 88.25 98.572-49.819 138.107-170.31 88.25-268.958C348.052 49.197 290.688 9.389 222 .97c-6.325-.775-31.6-1.13-38.4-.54M218 60.975c81.04 11.263 135.239 87.02 119.351 166.825-15.844 79.589-97.673 129.334-175.893 106.929-74.141-21.237-117.409-99.181-96.187-173.271C81.09 106.232 129.39 66.081 186.8 60.433c5.76-.567 25.716-.22 31.2.542m-57.4 94.781c-1.92.838-3.855 2.682-4.648 4.427-.974 2.145-1.175 76.834-.213 79.13.828 1.974 2.657 3.923 4.444 4.735 2.145.974 76.834 1.175 79.13.213 1.974-.828 3.923-2.657 4.735-4.444.974-2.145 1.175-76.834.213-79.13-.828-1.974-2.657-3.923-4.444-4.735-2.115-.96-77.043-1.146-79.217-.196"
          fill="#0454fc"
        />
        <path
          d="M181.5 155.1c10.175.059 26.825.059 37 0 10.175-.06 1.85-.108-18.5-.108s-28.675.048-18.5.108M154.992 200c0 20.35.048 28.675.108 18.5.059-10.175.059-26.825 0-37-.06-10.175-.108-1.85-.108 18.5m90 0c0 20.35.048 28.675.108 18.5.059-10.175.059-26.825 0-37-.06-10.175-.108-1.85-.108 18.5M181.5 245.1c10.175.059 26.825.059 37 0 10.175-.06 1.85-.108-18.5-.108s-28.675.048-18.5.108"
          fill="#5286fc"
        />
        <path
          d="M192.7 60.282a5.661 5.661 0 001.8 0c.495-.095.09-.173-.9-.173s-1.395.078-.9.173m12.8 0a5.661 5.661 0 001.8 0c.495-.095.09-.173-.9-.173s-1.395.078-.9.173M60.109 193.6c0 .99.078 1.395.173.9a5.661 5.661 0 000-1.8c-.095-.495-.173-.09-.173.9m279.6 0c0 .99.078 1.395.173.9a5.661 5.661 0 000-1.8c-.095-.495-.173-.09-.173.9m-279.6 12.8c0 .99.078 1.395.173.9a5.661 5.661 0 000-1.8c-.095-.495-.173-.09-.173.9m279.6 0c0 .99.078 1.395.173.9a5.661 5.661 0 000-1.8c-.095-.495-.173-.09-.173.9m-238.926 92.5c1.658 1.766 2.017 2.084 2.017 1.783 0-.064-.855-.919-1.9-1.9L99 297l1.783 1.9m198.017.1c-.972.99-1.677 1.8-1.567 1.8.11 0 .995-.81 1.967-1.8.972-.99 1.677-1.8 1.567-1.8-.11 0-.995.81-1.967 1.8m-106.1 40.882a5.661 5.661 0 001.8 0c.495-.095.09-.173-.9-.173s-1.395.078-.9.173m12.8 0a5.661 5.661 0 001.8 0c.495-.095.09-.173-.9-.173s-1.395.078-.9.173"
          fill="#84acfc"
        />
        <path
          d="M100.786 101.1l-2.186 2.3 2.3-2.186c2.137-2.032 2.483-2.414 2.186-2.414-.062 0-1.097 1.035-2.3 2.3M298.8 101c1.195 1.21 2.263 2.2 2.373 2.2.11 0-.778-.99-1.973-2.2-1.195-1.21-2.263-2.2-2.373-2.2-.11 0 .778.99 1.973 2.2"
          fill="#7cacfc"
        />
      </g>
    </svg>
  ),
  bgt: (props: LucideProps) => (
    <svg
      width="42"
      height="41"
      viewBox="0 0 42 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="21.0049" cy="20.5049" r="20.5049" fill="#FBBF24" />
      <path
        d="M29.4148 24.2396C30.4803 25.6631 30.7037 27.2105 30.0849 28.8819C29.4661 30.5532 28.2384 31.6495 26.4015 32.1707C25.5231 32.42 24.627 32.4298 23.7132 32.2001C22.7995 31.9704 22.0505 31.5357 21.4663 30.8961C19.3475 31.8426 17.3568 31.7962 15.4943 30.7571C13.6317 29.718 12.5125 28.0293 12.1366 25.691C11.2096 25.4651 10.4217 25.0199 9.7729 24.3555C9.12412 23.6911 8.6562 22.8531 8.36914 21.8415C7.90833 20.2176 8.27501 18.6969 9.46916 17.2794C10.6633 15.8619 12.0489 15.2457 13.626 15.431L16.3963 15.7667C16.6946 14.7904 17.2093 13.918 17.9404 13.1496C18.6716 12.3812 19.5354 11.8269 20.5319 11.4866L19.9427 9.41017C19.8445 9.06411 19.8764 8.74583 20.0385 8.45534C20.2005 8.16486 20.4546 7.97051 20.8007 7.87231C21.1467 7.7741 21.465 7.80603 21.7555 7.9681C22.046 8.13016 22.2403 8.38422 22.3385 8.73029L23.0184 11.1261C24.0864 11.1395 25.0287 11.3683 25.8451 11.8125C26.6615 12.2568 27.4546 12.9738 28.2245 13.9634L30.5405 13.3062C30.8865 13.208 31.2048 13.2399 31.4953 13.402C31.7858 13.5641 31.9801 13.8181 32.0783 14.1642C32.1765 14.5102 32.1446 14.8285 31.9825 15.119C31.8205 15.4095 31.5664 15.6038 31.2203 15.702L29.1439 16.2913C29.3778 17.318 29.3731 18.3404 29.1299 19.3587C28.8867 20.3769 28.428 21.2693 27.7539 22.0359L29.4148 24.2396ZM19.7839 28.0082C19.5799 27.2894 19.4415 26.5736 19.3687 25.8608C19.2958 25.148 19.2885 24.4381 19.3468 23.7313C18.8177 24.1978 18.2173 24.5911 17.5459 24.9111C16.8744 25.2311 16.1851 25.4626 15.4779 25.6058C15.7725 26.644 16.3042 27.3776 17.0732 27.8066C17.8421 28.2356 18.7457 28.3028 19.7839 28.0082ZM14.9707 22.298C15.8225 22.0563 16.5443 21.7364 17.1361 21.3384C17.7279 20.9403 18.4522 20.2745 19.3091 19.341L13.9508 18.7043C13.0882 18.6039 12.4312 18.7975 11.9799 19.2851C11.5286 19.7727 11.405 20.3759 11.6089 21.0947C11.8053 21.7868 12.1751 22.2284 12.7183 22.4194C13.2615 22.6104 14.0123 22.57 14.9707 22.298ZM25.495 28.9763C26.1605 28.7874 26.6335 28.4015 26.9139 27.8185C27.1943 27.2356 27.1563 26.7214 26.7998 26.2761L23.1025 21.4574C22.8384 22.4528 22.6875 23.4161 22.6497 24.3472C22.612 25.2784 22.6913 26.0901 22.8877 26.7822C23.137 27.6607 23.4808 28.2894 23.9191 28.6684C24.3575 29.0474 24.8828 29.15 25.495 28.9763ZM25.6149 19.3638C25.8056 19.022 25.9184 18.6088 25.9535 18.1243C25.9886 17.6397 25.9381 17.1579 25.8022 16.6787C25.5604 15.8268 25.0769 15.1874 24.3517 14.7604C23.6265 14.3334 22.8513 14.237 22.026 14.4711C21.5469 14.6071 21.117 14.8154 20.7364 15.096C20.3558 15.3766 20.0606 15.7048 19.8509 16.0808L23.3734 16.6344L25.6149 19.3638Z"
        fill="#78350F"
      />
    </svg>
  ),
  honey: (props: LucideProps) => (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="20.9951" cy="20.5146" r="20.5049" fill="#FEF3C7" />
      <path
        d="M15.1429 30.0877H11.998C11.4492 30.0877 10.9596 29.9648 10.4998 29.7189C10.0399 29.4731 9.68387 29.1317 9.40201 28.6947L7.72572 25.9635C7.4587 25.5538 7.3252 25.1168 7.3252 24.6252C7.3252 24.1335 7.4587 23.7102 7.72572 23.3005L9.43168 20.5283L7.72572 17.7697C7.4587 17.36 7.3252 16.9094 7.3252 16.4314C7.3252 15.9534 7.4587 15.5028 7.72572 15.0931L9.40201 12.3619C9.66903 11.9249 10.0399 11.5834 10.4998 11.3376C10.9596 11.0918 11.464 10.9553 11.998 10.9553H15.1429L16.8044 8.25132C17.0714 7.81432 17.4423 7.47291 17.9021 7.2271C18.362 6.98129 18.8664 6.84473 19.4004 6.84473H22.5898C23.1387 6.84473 23.6282 6.96763 24.0881 7.2271C24.5479 7.47291 24.904 7.81432 25.1858 8.25132L26.8621 10.9553H30.007C30.5559 10.9553 31.0454 11.0782 31.5053 11.3376C31.9651 11.5834 32.3212 11.9249 32.603 12.3619L34.2645 15.0931C34.5315 15.5028 34.665 15.9398 34.665 16.4314C34.665 16.923 34.5315 17.36 34.2645 17.7697L32.5585 20.5283L34.2645 23.3005C34.5315 23.7102 34.665 24.1472 34.665 24.6252C34.665 25.1031 34.5315 25.5538 34.2645 25.9635L32.603 28.6947C32.336 29.1317 31.9651 29.4731 31.5053 29.7189C31.0454 29.9648 30.541 30.0877 30.007 30.0877H26.8621L25.1858 32.7916C24.9188 33.2286 24.5479 33.57 24.0881 33.8158C23.6282 34.0616 23.1238 34.1845 22.5898 34.1845H19.4004C18.8515 34.1845 18.362 34.0616 17.9021 33.8158C17.4423 33.57 17.0862 33.2286 16.8044 32.7916L15.1429 30.0877ZM26.8621 19.1627H30.0515L31.6833 16.4314L30.0515 13.7002H26.8621L25.1858 16.4314L26.8621 19.1627ZM19.4449 23.2595H22.5601L24.2216 20.5283L22.5601 17.797H19.4449L17.7835 20.5283L19.4449 23.2595ZM19.4449 15.0658H22.5601L24.2661 12.2936L22.6046 9.60329H19.4152L17.7538 12.2936L19.4597 15.0658H19.4449ZM16.8192 16.4314L15.1578 13.7002H12.0129L10.3514 16.4314L12.0129 19.1627H15.1578L16.8192 16.4314ZM16.8192 24.6252L15.1578 21.8939H11.9684L10.3366 24.6252L11.998 27.3564H15.1429L16.8044 24.6252H16.8192ZM19.4449 25.9908L17.7389 28.7493L19.4004 31.4533H22.5898L24.2513 28.7493L22.5453 25.9908H19.4301H19.4449ZM26.8621 27.3564H30.007L31.6685 24.6252L30.007 21.8939H26.8621L25.1858 24.6252L26.8621 27.3564Z"
        fill="#D97706"
      />
    </svg>
  ),
  nature: (props: LucideProps) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.7589 9.93524C14.6904 14.221 10.3496 16.8292 6.06336 15.7605C1.77889 14.692 -0.829339 10.351 0.239588 6.06558C1.30758 1.77935 5.64835 -0.829071 9.93329 0.239387C14.2192 1.30785 16.8273 5.64936 15.7587 9.93532L15.7588 9.93524H15.7589Z"
        fill="url(#paint0_radial_1784_45064)"
      />
      <path
        d="M10.984 9.12266C11.3864 9.66027 11.4708 10.2447 11.2371 10.8759C11.0034 11.5071 10.5397 11.9212 9.846 12.118C9.51422 12.2122 9.17579 12.2159 8.8307 12.1291C8.48561 12.0424 8.20275 11.8782 7.98211 11.6366C7.18187 11.9941 6.43004 11.9766 5.72662 11.5841C5.02319 11.1917 4.6005 10.5539 4.45853 9.67081C4.10841 9.58548 3.81084 9.41735 3.56581 9.16641C3.32079 8.91547 3.14407 8.59898 3.03565 8.21693C2.86162 7.60365 3.0001 7.02932 3.4511 6.49396C3.9021 5.9586 4.42541 5.7259 5.02103 5.79588L6.06731 5.92265C6.17994 5.55392 6.37433 5.22445 6.65047 4.93425C6.92661 4.64405 7.25286 4.43469 7.6292 4.30617L7.40666 3.52196C7.36957 3.39126 7.38163 3.27106 7.44284 3.16135C7.50404 3.05164 7.6 2.97824 7.7307 2.94115C7.8614 2.90407 7.9816 2.91612 8.09131 2.97733C8.20102 3.03854 8.27442 3.13449 8.31151 3.26519L8.56828 4.17004C8.97166 4.17507 9.32751 4.26148 9.63585 4.42927C9.94419 4.59707 10.2437 4.86784 10.5345 5.2416L11.4092 4.99339C11.5399 4.9563 11.6601 4.96836 11.7698 5.02957C11.8795 5.09077 11.9529 5.18673 11.99 5.31743C12.0271 5.44813 12.015 5.56833 11.9538 5.67804C11.8926 5.78775 11.7966 5.86115 11.6659 5.89824L10.8817 6.12077C10.97 6.50853 10.9683 6.89468 10.8764 7.27924C10.7846 7.6638 10.6113 8.00084 10.3567 8.29036L10.984 9.12266ZM7.34669 10.5459C7.26966 10.2745 7.21738 10.0041 7.18987 9.73492C7.16236 9.46571 7.15961 9.19762 7.18163 8.93065C6.98177 9.10686 6.75505 9.25539 6.50146 9.37624C6.24787 9.49709 5.98753 9.58455 5.72042 9.63862C5.83169 10.0307 6.03252 10.3078 6.32293 10.4698C6.61333 10.6318 6.95459 10.6572 7.34669 10.5459ZM5.52886 8.38936C5.85059 8.29807 6.1232 8.17725 6.34669 8.02692C6.57019 7.87659 6.84375 7.62515 7.16737 7.27259L5.1437 7.03209C4.81791 6.99418 4.56979 7.06731 4.39934 7.25147C4.2289 7.43563 4.1822 7.66344 4.25923 7.93489C4.33341 8.19629 4.47308 8.36306 4.67823 8.43521C4.88338 8.50735 5.16692 8.49207 5.52886 8.38936ZM9.50364 10.9115C9.75498 10.8402 9.93361 10.6945 10.0395 10.4743C10.1454 10.2541 10.1311 10.06 9.99642 9.89177L8.60004 8.07188C8.50031 8.44781 8.44332 8.81161 8.42905 9.16329C8.41478 9.51497 8.44473 9.82151 8.51891 10.0829C8.61306 10.4147 8.74291 10.6521 8.90846 10.7953C9.07401 10.9384 9.2724 10.9772 9.50364 10.9115ZM9.54891 7.28116C9.62092 7.1521 9.66355 6.99606 9.67679 6.81305C9.69004 6.63004 9.67099 6.44806 9.61963 6.26709C9.52834 5.94536 9.34574 5.70387 9.07184 5.54259C8.79795 5.38132 8.50516 5.34491 8.19349 5.43335C8.01252 5.48471 7.85017 5.56337 7.70642 5.66934C7.56268 5.77531 7.4512 5.89929 7.37199 6.04126L8.70236 6.25037L9.54891 7.28116Z"
        fill="white"
      />
      <defs>
        <radialGradient
          id="paint0_radial_1784_45064"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(8.00396 8.00006) scale(195.333 3578.88)"
        >
          <stop stopColor="#694715" />
          <stop offset="0.114583" stopColor="#A89A86" />
        </radialGradient>
      </defs>
    </svg>
  ),
  telegram: (props: LucideProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.34682 15.1499L8.84101 20.5256C8.84101 20.5256 8.62928 22.1728 10.2761 20.5256C11.9229 18.8784 13.4992 17.6083 13.4992 17.6083"
        fill="currentColor"
      />
      <path
        d="M5.9007 13.5396L0.480567 11.7736C0.480567 11.7736 -0.167199 11.5108 0.0413813 10.9149C0.0843189 10.792 0.170934 10.6874 0.43004 10.5077C1.631 9.67061 22.6588 2.11267 22.6588 2.11267C22.6588 2.11267 23.2525 1.9126 23.6026 2.04567C23.6893 2.07249 23.7672 2.12183 23.8285 2.18866C23.8898 2.25548 23.9323 2.33739 23.9515 2.426C23.9893 2.58251 24.0052 2.74354 23.9985 2.90442C23.9969 3.0436 23.98 3.1726 23.9672 3.37488C23.8392 5.44126 20.0066 20.8633 20.0066 20.8633C20.0066 20.8633 19.7773 21.7657 18.9558 21.7966C18.7539 21.8031 18.5527 21.7689 18.3643 21.696C18.1759 21.6232 18.0041 21.5131 17.8592 21.3724C16.247 19.9856 10.6747 16.2408 9.44342 15.4172C9.41565 15.3983 9.39225 15.3736 9.37482 15.3449C9.35739 15.3162 9.34632 15.284 9.34237 15.2506C9.32516 15.1638 9.41954 15.0563 9.41954 15.0563C9.41954 15.0563 19.1223 6.43178 19.3805 5.52639C19.4005 5.45625 19.325 5.42164 19.2236 5.45236C18.5791 5.68944 7.40759 12.7443 6.17461 13.523C6.08586 13.5498 5.99205 13.5555 5.9007 13.5396Z"
        fill="currentColor"
      />
    </svg>
  ),
  elonMusk: (props: LucideProps) => (
    <svg
      viewBox="0 0 48 48"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M36.4878 4.5H43.1038L28.6498 21.02L45.6538 43.5H32.3398L21.9118 29.866L9.97981 43.5H3.35981L18.8198 25.83L2.50781 4.5H16.1598L25.5858 16.962L36.4878 4.5ZM34.1658 39.54H37.8318L14.1678 8.252H10.2338L34.1658 39.54Z"
        fill="currentColor"
      />
    </svg>
  ),
  gitHub: (props: LucideProps) => (
    <svg
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.9915 1C18.294 1.00296 12.7832 3.02092 8.4447 6.69305C4.10618 10.3652 1.22277 15.452 0.310056 21.044C-0.602662 26.636 0.51482 32.3684 3.46271 37.2164C6.4106 42.0643 10.9966 45.7115 16.4008 47.5059C17.5931 47.7272 18.0422 46.9883 18.0422 46.36C18.0422 45.7317 18.0183 43.91 18.0104 41.9184C11.3338 43.3608 9.92294 39.101 9.92294 39.101C8.83402 36.3349 7.26024 35.6078 7.26024 35.6078C5.0824 34.1299 7.4232 34.1576 7.4232 34.1576C9.83551 34.3275 11.1033 36.6194 11.1033 36.6194C13.2414 40.2667 16.7188 39.2116 18.0859 38.5952C18.3005 37.0501 18.9244 35.999 19.612 35.4023C14.2786 34.8017 8.67504 32.7548 8.67504 23.6108C8.64199 21.2394 9.52701 18.9461 11.147 17.2054C10.9006 16.6047 10.0779 14.1785 11.3815 10.8829C11.3815 10.8829 13.3964 10.2427 17.9826 13.3289C21.9163 12.2592 26.0667 12.2592 30.0004 13.3289C34.5827 10.2427 36.5936 10.8829 36.5936 10.8829C37.9011 14.1706 37.0784 16.5968 36.832 17.2054C38.4571 18.9464 39.344 21.2437 39.3079 23.6187C39.3079 32.7824 33.6924 34.8017 28.3512 35.3905C29.2096 36.1333 29.9766 37.5836 29.9766 39.8122C29.9766 43.0051 29.9488 45.5736 29.9488 46.36C29.9488 46.9962 30.3819 47.7391 31.598 47.5059C37.0029 45.7113 41.5894 42.0634 44.5372 37.2147C47.485 32.3659 48.6019 26.6326 47.6882 21.0401C46.7744 15.4476 43.8896 10.3607 39.5496 6.68921C35.2097 3.01771 29.6977 1.00108 23.9994 1H23.9915Z"
        fill="currentColor"
      />
    </svg>
  ),
  discord: (props: LucideProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.3303 4.52336C18.7535 3.80145 17.0888 3.2893 15.3789 3C15.1449 3.41829 14.9332 3.84865 14.7446 4.28928C12.9232 4.01482 11.071 4.01482 9.24961 4.28928C9.06095 3.84869 8.84924 3.41834 8.61535 3C6.90433 3.29174 5.2386 3.80511 3.66019 4.52713C0.526644 9.16327 -0.322811 13.6843 0.101917 18.1411C1.937 19.4969 3.99098 20.5281 6.17458 21.1897C6.66626 20.5284 7.10134 19.8268 7.47519 19.0925C6.76511 18.8273 6.07975 18.5001 5.42706 18.1146C5.59884 17.9901 5.76684 17.8617 5.92918 17.7371C7.82837 18.6303 9.90124 19.0933 12 19.0933C14.0987 19.0933 16.1715 18.6303 18.0707 17.7371C18.235 17.8711 18.403 17.9995 18.5729 18.1146C17.9189 18.5007 17.2323 18.8285 16.5209 19.0944C16.8943 19.8284 17.3294 20.5293 17.8216 21.1897C20.007 20.5307 22.0626 19.5001 23.898 18.143C24.3963 12.9745 23.0467 8.49503 20.3303 4.52336ZM8.01318 15.4002C6.82961 15.4002 5.85179 14.3261 5.85179 13.0047C5.85179 11.6833 6.79563 10.5998 8.0094 10.5998C9.22318 10.5998 10.1934 11.6833 10.1727 13.0047C10.1519 14.3261 9.21941 15.4002 8.01318 15.4002ZM15.9867 15.4002C14.8013 15.4002 13.8272 14.3261 13.8272 13.0047C13.8272 11.6833 14.7711 10.5998 15.9867 10.5998C17.2024 10.5998 18.1651 11.6833 18.1444 13.0047C18.1236 14.3261 17.193 15.4002 15.9867 15.4002Z"
        fill="currentColor"
      />
    </svg>
  ),
  gauge: (props: LucideProps) => (
    <svg
      width="144"
      height="144"
      viewBox="0 0 144 144"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M96 96L114 48L132 96C126.78 99.9 120.48 102 114 102C107.52 102 101.22 99.9 96 96Z"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 96L30 48L48 96C42.78 99.9 36.48 102 30 102C23.52 102 17.22 99.9 12 96Z"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 126H102"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M72 18V126"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 42H30C42 42 60 36 72 30C84 36 102 42 114 42H126"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  validator: (props: LucideProps) => (
    <svg
      width="171"
      height="171"
      viewBox="0 0 171 171"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M106.875 14.25H64.125V57H106.875V14.25Z"
        stroke="currentColor"
        strokeWidth="14.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M156.75 114H114V156.75H156.75V114Z"
        stroke="currentColor"
        strokeWidth="14.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M57 114H14.25V156.75H57V114Z"
        stroke="currentColor"
        strokeWidth="14.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.625 114V85.5H135.375V114"
        stroke="currentColor"
        strokeWidth="14.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M85.5 85.5V57"
        stroke="currentColor"
        strokeWidth="14.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  cube: (props: LucideProps) => (
    <svg
      width="81"
      height="81"
      viewBox="0 0 81 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_9450_13757)">
        <path
          d="M55.8051 22.3184C52.6451 20.3685 52.6904 20.3983 52.5296 20.3988C52.4266 20.3985 52.4062 20.4171 52.4059 20.4977C52.4071 20.6199 54.1315 24.7074 54.2807 24.9403C54.3467 25.0384 54.5417 25.2496 54.7202 25.4016C54.9999 25.6506 55.4577 25.9358 58.1053 27.5171C59.8404 28.5536 61.2508 29.369 61.3645 29.4066C61.5715 29.4713 61.6384 29.4374 61.6101 29.2766C61.5827 29.1511 59.6361 25.062 59.5068 24.8621C59.4564 24.7878 59.2353 24.5734 59.0179 24.3907C58.6893 24.1091 58.1679 23.7738 55.8051 22.3184Z"
          fill="#373332"
        />
        <path
          d="M47.7811 17.3432C44.4088 15.255 44.1924 15.1367 44.1008 15.3186C44.0588 15.4011 45.512 19.5637 45.6604 19.7902C45.7116 19.8709 45.9334 20.0916 46.148 20.2778C46.5084 20.5846 46.8346 20.7893 49.8896 22.6105C51.7316 23.7078 53.3096 24.638 53.4008 24.6751C53.6142 24.768 53.782 24.7442 53.78 24.6156C53.784 24.5668 53.3823 23.5695 52.8903 22.403C51.9117 20.0628 51.8833 20.0115 51.2971 19.5618C51.128 19.4344 49.5482 18.4337 47.7811 17.3432Z"
          fill="#373332"
        />
        <path
          d="M39.1388 11.9801C37.1948 10.7793 35.4992 9.75084 35.3678 9.69936C35.1148 9.59839 34.9702 9.60004 34.9375 9.70711C34.9187 9.76738 35.2657 11.1257 35.8705 13.3507C36.1661 14.4319 36.0811 14.3651 40.3224 16.9004C44.2899 19.2665 44.6387 19.4716 44.8095 19.5022C45.0136 19.5415 45.1002 19.5116 45.1032 19.3985C45.1059 19.2275 43.6867 15.2184 43.5417 14.9947C43.2469 14.5318 42.9709 14.3434 39.1388 11.9801Z"
          fill="#373332"
        />
        <path
          d="M58.1834 27.7458C56.5735 26.7906 55.1794 25.9763 55.0917 25.942C55.0013 25.9112 54.8827 25.8871 54.8284 25.8906C54.7332 25.9023 54.7248 25.913 54.7337 26.0181C54.7453 26.2293 56.7496 30.9007 56.9199 31.1213C57.2789 31.5828 57.5952 31.7855 60.8563 33.6361C62.5438 34.5947 63.9867 35.4126 64.0588 35.4521C64.2334 35.5433 64.4648 35.5407 64.4954 35.4435C64.526 35.3464 62.2695 30.5803 62.0608 30.3065C61.7528 29.8967 61.283 29.5904 58.1834 27.7458Z"
          fill="#373332"
        />
        <path
          d="M34.3192 9.75715C34.2531 9.79747 34.1553 9.87066 34.0963 9.91655C34.038 9.9688 32.9203 11.6003 31.6135 13.5449C29.1563 17.1991 29.0099 17.436 28.9113 17.9183C28.8706 18.123 28.9217 18.5096 29.339 21.0604C29.4805 21.9222 29.6256 22.6483 29.6574 22.6734C29.7318 22.7319 29.9058 22.6783 30.0582 22.5501C30.2164 22.4148 35.0591 15.4598 35.3061 15.0076C35.5481 14.5689 35.6723 14.1124 35.6266 13.8282C35.5504 13.3642 34.5684 9.79739 34.5047 9.74725C34.4587 9.71104 34.3917 9.71604 34.3192 9.75715Z"
          fill="#373332"
        />
        <path
          d="M50.0092 22.873C48.2161 21.8082 46.6522 20.8892 46.5328 20.8298C46.2634 20.6987 46.0764 20.6959 46.0325 20.8172C45.9956 20.9151 47.6345 25.5992 47.7951 25.8468C47.9514 26.0852 48.4125 26.5117 48.7422 26.7192C49.1731 26.9947 55.6997 30.7051 55.8926 30.7876C56.1061 30.8806 56.3 30.86 56.3213 30.7382C56.3289 30.6922 55.8757 29.5563 55.3187 28.2174C54.1968 25.5276 54.194 25.5312 53.5894 25.0612C53.4061 24.9227 51.8653 23.9815 50.0092 22.873Z"
          fill="#373332"
        />
        <path
          d="M40.8201 17.3959C38.7992 16.1981 37.0797 15.1855 37.0012 15.1468C36.9228 15.1081 36.7723 15.059 36.6734 15.0389C36.3013 14.9654 36.2991 14.9464 36.9932 17.5534C37.3506 18.8911 37.6781 20.0263 37.7406 20.1217C37.8082 20.2325 38.0087 20.4366 38.2764 20.6645C38.6943 21.0222 38.818 21.0908 42.6825 23.2891C46.9706 25.7285 47.0251 25.7541 47.1822 25.5544C47.2411 25.4796 47.1473 25.1691 46.3975 23.0262C45.93 21.6827 45.4958 20.5155 45.434 20.4265C45.373 20.3438 45.1342 20.1155 44.9062 19.9245C44.5315 19.6066 44.1474 19.3736 40.8201 17.3959Z"
          fill="#373332"
        />
        <path
          d="M64.2562 35.7984C63.8742 35.5555 57.7919 32.1255 57.6711 32.0824C57.594 32.0564 57.4875 32.0534 57.4354 32.0759C57.3559 32.1114 57.3405 32.1455 57.3573 32.2626C57.3878 32.4714 59.5728 37.6198 59.7447 37.8821C59.8306 38.0133 60.0291 38.2272 60.2296 38.4022C60.5518 38.6847 60.7343 38.7879 63.9313 40.5014C65.777 41.4921 67.3489 42.3135 67.4153 42.3311C67.6293 42.3725 67.7157 42.3135 67.6952 42.1357C67.6631 41.9142 65.1768 36.7191 64.9845 36.4754C64.8107 36.252 64.4614 35.931 64.2562 35.7984Z"
          fill="#373332"
        />
        <path
          d="M35.788 15.0867C35.7182 15.0953 35.6232 15.136 35.5733 15.1775C35.5234 15.2191 35.4475 15.2863 35.4004 15.3243C35.3533 15.3623 34.9376 15.9415 34.4772 16.6067C34.0196 17.2683 32.901 18.8645 31.9983 20.1573C31.0949 21.4437 30.275 22.6457 30.1799 22.8249C29.9547 23.2422 29.8343 23.6209 29.8357 23.9105C29.8377 24.2066 30.6262 28.9661 30.6967 29.1024C30.7387 29.1874 30.7734 29.2089 30.8657 29.2008C31.0921 29.1826 31.2725 28.9898 31.9406 28.0608C32.8168 26.8454 33.6966 25.6327 35.3461 23.3691C36.1264 22.2975 36.8202 21.3138 36.8916 21.1795C37.0902 20.8105 37.2274 20.4104 37.2368 20.1581C37.2453 20.0089 37.0267 19.0922 36.6174 17.529C36.2714 16.206 35.968 15.1129 35.9503 15.099C35.9291 15.0823 35.8578 15.0782 35.788 15.0867Z"
          fill="#373332"
        />
        <path
          d="M55.8209 31.0019C55.787 30.9867 54.1921 30.078 52.2768 28.9863C48.5262 26.8545 48.4442 26.813 48.2687 26.9924C48.1879 27.0732 48.2438 27.2499 49.1578 29.8395C49.8518 31.8057 50.1767 32.6675 50.2889 32.8309C50.4117 33.0026 50.5569 33.1458 50.9102 33.418C51.3421 33.7578 51.5967 33.9005 54.9641 35.6961C56.9399 36.7546 58.6264 37.6488 58.7176 37.686C58.8936 37.761 59.1024 37.7579 59.1641 37.6794C59.1865 37.6509 59.1947 37.5823 59.1881 37.5251C59.1751 37.4687 58.6579 36.1958 58.031 34.698C56.7772 31.7024 56.7892 31.7235 56.1889 31.2626C56.0198 31.1352 55.8549 31.017 55.8209 31.0019Z"
          fill="#373332"
        />
        <path
          d="M46.5708 25.7491C46.5085 25.7117 44.7418 24.7081 42.6483 23.5224C40.5576 22.3332 38.7415 21.3196 38.61 21.2681C38.3938 21.1787 38.1094 21.1686 38.0477 21.247C38.0309 21.2684 38.0285 21.3589 38.0486 21.4498C38.1254 21.8912 39.4662 26.7794 39.5487 26.9367C39.701 27.2239 40.0299 27.5636 40.4219 27.8375C40.6321 27.9855 42.463 28.9877 44.9225 30.3055C49.2206 32.6085 49.35 32.6699 49.5377 32.5405C49.5799 32.516 49.6178 32.4534 49.6246 32.401C49.648 32.2694 47.7761 26.9344 47.6191 26.6896C47.4855 26.4806 46.8317 25.891 46.5708 25.7491Z"
          fill="#373332"
        />
        <path
          d="M67.0668 42.5701C66.0046 41.9824 60.7357 39.1868 60.5739 39.123C60.1894 38.9705 59.7002 39.0531 59.2635 39.3386C59.0869 39.4537 53.4557 45.5168 53.0741 46.0017C52.8525 46.2833 52.795 46.5094 52.8751 46.7571C52.9517 47.0022 53.084 47.089 53.8856 47.4543C54.2631 47.6301 55.7307 48.3001 57.1409 48.9481C58.5512 49.5961 59.779 50.141 59.8652 50.1626C60.2056 50.2399 60.791 50.0714 61.1023 49.8142C61.1606 49.762 62.5623 48.3597 64.2202 46.6972C66.3935 44.511 67.2501 43.6265 67.3018 43.5171C67.4884 43.127 67.3935 42.7522 67.0668 42.5701Z"
          fill="#373332"
        />
        <path
          d="M37.4592 21.3314C37.2876 21.2945 37.1013 21.4366 36.7478 21.8858C36.3712 22.3571 31.5614 28.957 31.3512 29.2823C31.1474 29.6068 30.9503 30.156 30.9305 30.4579C30.9206 30.5944 31.136 32.0397 31.4008 33.6624C31.8622 36.4558 31.8968 36.6158 32.0193 36.7006C32.1204 36.7687 32.1818 36.7708 32.3206 36.7183C32.474 36.6544 32.5316 36.5958 32.9033 36.109C37.249 30.4485 38.4172 28.9202 38.6246 28.5985C38.7717 28.3679 38.9164 28.0892 38.9735 27.9148C39.1913 27.2665 39.2073 27.3772 38.399 24.3108C37.9941 22.7568 37.6411 21.4572 37.6176 21.4215C37.597 21.3822 37.5249 21.3427 37.4592 21.3314Z"
          fill="#373332"
        />
        <path
          d="M55.5137 36.3828C50.5934 33.7633 51.082 34.0093 50.7573 33.9847C50.4003 33.9577 49.9156 34.1074 49.6514 34.3267C49.3991 34.538 43.4837 41.5667 43.414 41.7427C43.2507 42.1396 43.327 42.4651 43.6342 42.7011C43.8954 42.9009 50.997 46.1574 51.29 46.2148C51.4086 46.2389 51.6365 46.2335 51.7972 46.2041C52.3519 46.1038 52.2192 46.236 55.5148 42.6528C57.1377 40.8819 58.5401 39.3475 58.6271 39.2369C58.9574 38.8099 58.9283 38.3079 58.5553 38.0317C58.4817 37.9795 57.1119 37.2364 55.5137 36.3828Z"
          fill="#373332"
        />
        <path
          d="M44.5181 30.5066C41.4937 28.8942 40.3984 28.3267 40.2232 28.287C39.8857 28.206 39.4839 28.2651 39.1313 28.4436L38.83 28.5933L38.3461 29.2227C37.2417 30.6626 33.1831 36.0238 32.9448 36.3558C32.6399 36.7797 32.5775 37.0192 32.6785 37.3643C32.8046 37.7868 32.7636 37.7661 36.1073 39.3006C37.7649 40.0567 39.6411 40.9213 40.2794 41.21C40.9149 41.5023 41.5171 41.7568 41.6159 41.7769C41.8666 41.8298 42.3319 41.763 42.5754 41.643C42.688 41.5873 42.8722 41.4552 42.9881 41.3443C43.1012 41.237 44.5172 39.5689 46.1344 37.6377C49.3989 33.7298 49.246 33.9386 49.201 33.4933C49.1715 33.2103 49.0684 33.0426 48.8037 32.84C48.677 32.7461 46.7506 31.6977 44.5181 30.5066Z"
          fill="#373332"
        />
        <path
          d="M28.3847 18.5653C28.2107 18.6189 28.0522 18.8348 26.3664 21.3412C25.5347 22.5801 24.6119 23.9494 24.3148 24.3852C23.7164 25.2766 23.594 25.4978 23.4493 25.9439C23.3491 26.246 23.3517 26.352 23.5462 28.6178C23.6544 29.9152 23.7659 31.019 23.7916 31.0738C23.8286 31.1433 23.8653 31.1549 23.9689 31.1325C24.0725 31.1101 24.1484 31.0429 24.3055 30.8432C24.7768 30.2443 28.9192 24.2449 29.0428 23.9785C29.1854 23.6808 29.3082 23.2406 29.2968 23.0585C29.2777 22.7259 28.5951 18.6039 28.5526 18.5704C28.5243 18.5482 28.4466 18.5448 28.3847 18.5653Z"
          fill="#373332"
        />
        <path
          d="M29.3744 24.2862C29.1472 24.269 29.0041 24.4508 27.5498 26.5391C26.9506 27.3953 25.9604 28.8211 25.3478 29.7014C24.1641 31.4023 24.0213 31.642 23.9151 32.1703C23.8612 32.4281 24.2947 37.7626 24.3764 37.8846C24.4034 37.9232 24.46 37.9677 24.4996 37.9758C24.6868 38.0365 24.7773 37.9288 27.0977 34.7326C29.913 30.8638 30.0202 30.7057 30.1735 30.2779C30.2361 30.0963 30.3049 29.856 30.3213 29.7477C30.3514 29.5347 29.5455 24.3747 29.4782 24.3218C29.4535 24.3023 29.4068 24.2887 29.3744 24.2862Z"
          fill="#373332"
        />
        <path
          d="M56.1566 49.0401C54.4177 48.2489 52.9035 47.5653 52.7926 47.5242C52.5127 47.4137 51.9008 47.492 51.5941 47.6778C51.3957 47.7988 50.9801 48.2395 48.592 50.8225C47.0681 52.4749 45.7836 53.8886 45.7445 53.9675C45.6997 54.0535 45.6785 54.2042 45.6925 54.3249C45.713 54.5027 45.7415 54.5539 45.8902 54.6709C46.0105 54.7656 47.0042 55.1782 49.2996 56.0782C51.0825 56.7771 52.6181 57.3679 52.717 57.3879C52.957 57.4325 53.3503 57.3552 53.6388 57.2071C53.8514 57.0973 54.1667 56.7913 56.5887 54.3619C58.0787 52.8618 59.3658 51.5541 59.4444 51.4543C59.5285 51.3473 59.5991 51.2066 59.6163 51.1047C59.6486 50.9107 59.5535 50.6454 59.4162 50.5431C59.3667 50.5041 57.9019 49.8306 56.1566 49.0401Z"
          fill="#373332"
        />
        <path
          d="M47.0029 44.8665C45.006 43.9588 43.2996 43.199 43.2106 43.1809C42.8138 43.088 42.1677 43.2607 41.8649 43.5362C41.801 43.5956 40.5176 45.1025 39.0182 46.884C36.3198 50.0944 36.291 50.1237 36.2545 50.3085C36.2057 50.5818 36.2899 50.8097 36.5094 50.9825C36.6475 51.0911 37.6037 51.4857 40.2128 52.5114C42.1513 53.275 43.8226 53.9263 43.9293 53.9583C44.3305 54.0894 44.8501 54.0192 45.218 53.7775C45.4128 53.6538 50.8985 47.6955 50.9901 47.5135C51.1551 47.1873 51.0781 46.8554 50.7858 46.6369C50.7043 46.5728 48.9999 45.7742 47.0029 44.8665Z"
          fill="#373332"
        />
        <path
          d="M30.357 30.9478C30.2829 30.9473 30.1675 31.0065 30.0825 31.0781C29.9574 31.1933 25.5841 37.1439 25.0264 37.9691C24.9192 38.1272 24.7715 38.3805 24.7052 38.5303C24.4524 39.0991 24.4547 39.2857 24.7163 42.3548C24.9845 45.4811 25.0153 45.7478 25.118 45.8286C25.1569 45.8592 25.2543 45.8666 25.3325 45.8473C25.4763 45.8103 25.5135 45.7703 26.2253 44.8585C26.6349 44.338 27.9154 42.6672 29.0682 41.1441C31.364 38.1248 31.3009 38.2195 31.4671 37.5421C31.5634 37.1503 31.5553 37.0805 31.0151 33.7171C30.6564 31.4778 30.5703 31.0118 30.5031 30.9589C30.4925 30.9505 30.4275 30.9456 30.357 30.9478Z"
          fill="#373332"
        />
        <path
          d="M22.8811 26.6873C22.829 26.7098 22.7187 26.8135 22.6373 26.9169C22.3147 27.3269 18.6902 32.741 18.5546 33.0153C18.2891 33.5567 18.2773 33.7611 18.3361 36.1337C18.4017 38.76 18.4114 38.8715 18.5349 38.8821C18.5836 38.8858 18.673 38.8522 18.7328 38.8127C18.8241 38.7403 20.057 36.9916 22.5 33.4647C23.4678 32.0674 23.5256 31.8993 23.4292 30.7035C23.1955 27.7372 23.1009 26.7795 23.042 26.7158C22.9981 26.6697 22.9388 26.6577 22.8811 26.6873Z"
          fill="#373332"
        />
        <path
          d="M36.9046 40.268C33.7802 38.8483 32.6888 38.3704 32.4954 38.3394C32.0196 38.2594 31.4518 38.4418 31.1402 38.7796C30.9429 38.9938 26.0029 45.497 25.8208 45.7866C25.75 45.8984 25.6859 46.0673 25.6779 46.1649C25.6592 46.3926 25.8095 46.7187 25.9971 46.8664C26.075 46.9276 26.5634 47.1446 27.0793 47.3486C32.4764 49.4715 34.3865 50.2127 34.5383 50.2456C34.9231 50.3175 35.5593 50.1427 35.829 49.8874C36.1191 49.6135 41.3375 43.3466 41.4038 43.1968C41.5343 42.878 41.4137 42.4194 41.1398 42.2212C41.0937 42.185 39.1872 41.3081 36.9046 40.268Z"
          fill="#373332"
        />
        <path
          d="M23.3401 32.7392C23.1881 32.8159 22.9307 33.1502 22.1781 34.2377C21.8332 34.7341 20.9397 36.0225 20.1856 37.0974C18.7699 39.1294 18.6565 39.3172 18.5024 39.8772C18.4379 40.1266 18.5501 45.6873 18.6278 45.8581C18.6634 45.9439 18.691 45.9599 18.8052 45.9458C18.9857 45.9205 18.7844 46.1835 22.6863 40.8029C24.1346 38.8023 24.104 38.8995 23.9351 36.8269C23.8707 36.0201 23.7699 34.7862 23.7109 34.0817C23.5976 32.7398 23.5646 32.6215 23.3401 32.7392Z"
          fill="#373332"
        />
        <path
          d="M48.945 56.4055C46.9946 55.6499 45.6195 55.1393 45.4755 55.1183C45.1388 55.0727 44.7012 55.1844 44.4221 55.3861C44.3567 55.4328 43.1703 56.6928 41.7895 58.1923C39.0842 61.1202 39.1291 61.0632 39.1981 61.3542C39.2715 61.6543 39.3492 61.6867 42.838 62.862C44.636 63.4688 46.174 63.9691 46.2615 63.9745C46.5169 63.985 46.9031 63.9021 47.1121 63.7895C47.3908 63.6394 52.3906 58.6263 52.4861 58.3956C52.5797 58.1748 52.5115 57.9191 52.3281 57.7806C52.2432 57.7137 50.8014 57.1276 48.945 56.4055Z"
          fill="#373332"
        />
        <path
          d="M39.9385 52.8965C37.9344 52.1218 36.2243 51.4687 36.1389 51.4534C35.8861 51.4104 35.3301 51.527 35.093 51.6752C34.8974 51.7926 34.6701 52.0524 32.5252 54.5959C31.2293 56.1333 30.0942 57.5029 29.9974 57.6404C29.8538 57.8448 29.821 57.9229 29.8321 58.0471C29.8493 58.2511 29.9856 58.4566 30.1745 58.559C30.3428 58.6511 37.4051 61.0396 37.6452 61.0842C37.8824 61.1324 38.2708 61.0686 38.5334 60.9462C38.8297 60.81 38.7518 60.8872 41.6009 57.7838C43.8675 55.3188 43.9468 55.2254 43.9848 55.0533C44.0381 54.8181 43.9502 54.5873 43.7457 54.4321C43.6437 54.3577 42.2055 53.7743 39.9385 52.8965Z"
          fill="#373332"
        />
        <path
          d="M23.9436 39.6795C23.7773 39.716 23.5948 39.9188 22.987 40.7566C18.593 46.8063 18.8957 46.3634 18.7179 46.9681C18.6214 47.302 18.6226 47.1183 18.7091 50.7596C18.7649 52.9394 18.8075 53.9196 18.86 53.984C18.9097 54.052 18.9669 54.0739 19.0649 54.0587C19.2299 54.0384 19.0299 54.2852 21.6281 50.9035C24.0355 47.7643 24.3621 47.3055 24.5167 46.8615C24.5822 46.6763 24.6467 46.4268 24.6616 46.3059C24.6896 46.1027 24.2453 40.2575 24.176 39.9086C24.142 39.726 24.0627 39.652 23.9436 39.6795Z"
          fill="#373332"
        />
        <path
          d="M33.9708 50.5727C33.9475 50.5659 32.1482 49.8659 29.978 49.0181C27.8078 48.1703 25.9414 47.4463 25.8312 47.4115C25.5444 47.3244 24.9656 47.3826 24.6735 47.5279C24.4426 47.6464 24.4166 47.6722 23.8499 48.3923C22.7481 49.7996 19.4948 54.1377 19.4593 54.2483C19.4225 54.3752 19.4474 54.5911 19.5173 54.75C19.6427 55.0277 19.7636 55.0708 23.956 56.4882C26.1794 57.2393 28.0989 57.8666 28.2168 57.8844C28.5076 57.9227 28.8854 57.8506 29.1676 57.7032L29.4013 57.5811L31.9151 54.5834C34.4178 51.5999 34.429 51.5856 34.4627 51.4044C34.508 51.1283 34.4202 50.8976 34.1979 50.7284C34.0988 50.6504 33.9976 50.5823 33.9708 50.5727Z"
          fill="#373332"
        />
      </g>
      <defs>
        <clipPath id="clip0_9450_13757">
          <rect
            width="56.3065"
            height="58.0661"
            fill="white"
            transform="translate(35.9092) rotate(38.2013)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  valiCounts: (props: LucideProps) => (
    <svg
      width="64"
      height="79"
      viewBox="0 0 64 79"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="64" height="79" rx="5" fill="#F47226" fillOpacity="0.2" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.8077 16.6428C30.3722 14.4524 33.6277 14.4524 35.1923 16.6428L35.4414 16.9915C35.7166 17.377 36.179 17.5834 36.6498 17.5311L37.76 17.4077C40.2587 17.1301 42.3699 19.2414 42.0923 21.74L41.969 22.8502C41.9167 23.321 42.123 23.7833 42.5085 24.0587L42.8573 24.3077C45.0476 25.8722 45.0476 29.1277 42.8573 30.6923L42.5085 30.9414C42.123 31.2166 41.9167 31.679 41.969 32.1498L42.0923 33.26C42.3699 35.7587 40.2587 37.8699 37.76 37.5923L36.6498 37.469C36.179 37.4167 35.7166 37.623 35.4414 38.0085L35.1923 38.3573C33.6277 40.5476 30.3724 40.5476 28.8077 38.3573L28.5587 38.0085C28.2833 37.623 27.821 37.4167 27.3502 37.469L26.24 37.5923C23.7414 37.8699 21.6301 35.7587 21.9077 33.26L22.0311 32.1498C22.0834 31.679 21.877 31.2166 21.4915 30.9414L21.1428 30.6923C18.9524 29.1277 18.9524 25.8724 21.1428 24.3077L21.4915 24.0587C21.877 23.7833 22.0834 23.321 22.0311 22.8502L21.9077 21.74C21.6301 19.2414 23.7414 17.1301 26.24 17.4077L27.3502 17.5311C27.821 17.5834 28.2833 17.377 28.5587 16.9915L28.8077 16.6428ZM36.8476 23.96C37.3583 24.4707 37.3583 25.2987 36.8476 25.8093L31.8538 30.8032C31.2124 31.4447 30.1723 31.4447 29.5309 30.8032L27.1524 28.4247C26.6417 27.914 26.6417 27.086 27.1524 26.5754C27.6631 26.0647 28.491 26.0647 29.0017 26.5754L30.6924 28.266L34.9984 23.96C35.509 23.4494 36.337 23.4494 36.8476 23.96Z"
        fill="#F47226"
      />
      <rect x="15" y="48" width="34" height="4" rx="2" fill="#F47226" />
      <rect x="5" y="60" width="54" height="4" rx="2" fill="#F47226" />
    </svg>
  ),
  celebrateIcons: (props: LucideProps) => (
    <svg
      width="89"
      height="80"
      viewBox="0 0 89 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M44.5638 69.7461L43.4201 69.3946C33.5695 66.3656 28.6443 64.8513 27.7274 61.2684C26.8101 57.685 30.4815 54.299 37.8233 47.5265L45.0644 40.8478C45.0709 40.8664 45.0777 40.8857 45.0846 40.9063C45.1686 41.1506 45.2903 41.5104 45.4369 41.9627C45.731 42.869 46.1232 44.1377 46.515 45.584C47.3165 48.5446 48.0439 51.9971 48.0439 54.5983C48.0439 57.1995 47.3165 60.652 46.515 63.6126C46.1232 65.0589 45.731 66.3276 45.4369 67.2338C45.2903 67.6861 45.1686 68.0459 45.0846 68.2903C45.0426 68.4125 45.01 68.5058 44.9886 68.5667L44.9646 68.6343L44.959 68.6493L44.5638 69.7461Z"
        fill="#F47226"
        fillOpacity="0.2"
      />
      <path
        d="M68.4983 76.9693C78.3714 79.9477 83.5733 81.194 86.4509 78.5612C89.6372 75.6455 87.6251 70.1221 83.6009 59.0753L76.2252 38.8285C73.466 31.2544 71.8452 26.8049 69.1404 25L69.1631 25.1031C69.1947 25.2465 69.2402 25.4562 69.2976 25.7258C69.4122 26.2651 69.5742 27.0449 69.7655 28.0162C70.1479 29.9577 70.6486 32.6709 71.1227 35.7623C72.0619 41.8868 72.9318 49.7123 72.4837 55.9659C72.2125 59.7496 71.3521 64.4437 70.5843 68.1112C70.1968 69.9623 69.8258 71.5845 69.5516 72.745C69.4144 73.3254 69.3011 73.7912 69.2219 74.1135L69.1296 74.4854L68.4983 76.9693Z"
        fill="#F47226"
        fillOpacity="0.2"
      />
      <path
        d="M63.1425 25L63.3587 25.9872L63.3608 25.9969L63.3686 26.033L63.4007 26.1826C63.429 26.3158 63.4711 26.5151 63.5245 26.7744C63.6315 27.2931 63.7844 28.0511 63.9655 28.9996C64.3282 30.8978 64.8033 33.5523 65.2526 36.5727C66.1598 42.6717 66.9271 50.045 66.5343 55.6952C66.2965 59.116 65.5199 63.5415 64.7786 67.1921C64.4114 69.0005 64.0595 70.5867 63.7996 71.7206C63.6697 72.2873 63.563 72.7397 63.4891 73.0492L63.4042 73.4022L63.3824 73.4911L62.9267 75.339L51.3426 71.6968L51.7799 70.4539C51.8059 70.3786 51.843 70.2704 51.8896 70.1319C51.983 69.8546 52.1144 69.4565 52.2714 68.9611C52.5855 67.9721 53.0036 66.5887 53.4226 65.0061C54.2422 61.9101 55.1353 57.7954 55.1353 54.367C55.1353 50.9385 54.2422 46.8238 53.4226 43.7278C53.0036 42.1452 52.5855 40.7619 52.2714 39.7729C52.1144 39.2775 51.983 38.8794 51.8896 38.6021C51.843 38.4636 51.8059 38.3553 51.7799 38.2801L51.7411 38.1678L50.8335 35.5917L52.9789 33.5678C57.4316 29.3673 60.5281 26.4464 63.1425 25Z"
        fill="#F47226"
        fillOpacity="0.2"
      />
      <path
        d="M52.7421 0.470227C51.1693 1.39204 50.6735 3.36165 51.6353 4.86952C52.3327 5.96371 52.1578 7.37366 51.212 8.2805L50.7763 8.69812C48.1567 11.2097 47.1904 14.8994 48.2626 18.2994C48.7958 19.9911 50.6588 20.948 52.4235 20.4366C54.1881 19.9252 55.1864 18.1393 54.6528 16.4476C54.2927 15.3059 54.6172 14.0669 55.4971 13.2236L55.9328 12.806C59.0593 9.80855 59.6373 5.14809 57.331 1.53139C56.3694 0.0235096 54.315 -0.451582 52.7421 0.470227Z"
        fill="#F47226"
      />
      <path
        d="M41.0177 9.15894C40.1227 8.30113 39.6754 7.8722 39.1582 7.71498C38.7203 7.58199 38.2508 7.58199 37.8133 7.71498C37.2957 7.8722 36.8484 8.30113 35.9534 9.15894C35.0588 10.0168 34.6115 10.4457 34.4473 10.9417C34.3084 11.3611 34.3084 11.8115 34.4473 12.231C34.6115 12.7269 35.0588 13.1559 35.9534 14.0137C36.8484 14.8715 37.2957 15.3004 37.8133 15.4577C38.2508 15.5906 38.7203 15.5906 39.1582 15.4577C39.6754 15.3004 40.1227 14.8715 41.0177 14.0137C41.9123 13.1559 42.36 12.7269 42.5238 12.231C42.6626 11.8115 42.6626 11.3611 42.5238 10.9417C42.36 10.4457 41.9123 10.0168 41.0177 9.15894Z"
        fill="#F47226"
      />
      <path
        d="M70.542 7.21522C69.6097 6.32149 68.0982 6.32149 67.166 7.21522C66.2337 8.10896 66.2337 9.558 67.166 10.4517C68.0982 11.3454 69.6097 11.3454 70.542 10.4517C71.4743 9.558 71.4743 8.10896 70.542 7.21522Z"
        fill="#F47226"
      />
      <path
        d="M12.4745 20.4653C13.0905 20.6929 13.6366 21.2164 14.7287 22.2633C15.8209 23.3104 16.367 23.8339 16.6042 24.4244C16.8819 25.1155 16.8819 25.8809 16.6042 26.572C16.367 27.1626 15.8209 27.6861 14.7287 28.7331C13.6366 29.7801 13.0905 30.3036 12.4745 30.5311C11.7535 30.7974 10.9551 30.7974 10.2341 30.5311C9.61811 30.3036 9.07202 29.7801 7.97984 28.7331C6.88766 27.6861 6.34157 27.1626 6.10436 26.572C5.82664 25.8809 5.82664 25.1155 6.10436 24.4244C6.34157 23.8339 6.88766 23.3104 7.97984 22.2633C9.07202 21.2164 9.61811 20.6929 10.2341 20.4653C10.9551 20.1991 11.7535 20.1991 12.4745 20.4653Z"
        fill="#F47226"
      />
      <path
        d="M16.5527 55.7368C15.6207 54.8429 14.1088 54.8429 13.1769 55.7368C12.2445 56.6302 12.2445 58.0792 13.1769 58.9731C14.1088 59.8669 15.6207 59.8669 16.5527 58.9731C17.4851 58.0792 17.4851 56.6302 16.5527 55.7368Z"
        fill="#F47226"
      />
      <path
        d="M22.6424 10.5452C20.8346 10.8918 19.6623 12.5776 20.0237 14.3106L20.6646 17.3823C21.5467 21.6097 24.7239 25.0601 28.9903 26.4234C30.9837 27.0604 32.4684 28.6727 32.8806 30.648L33.521 33.7197C33.8828 35.4528 35.6413 36.5767 37.4491 36.2302C39.2565 35.8833 40.4288 34.1976 40.0674 32.4646L39.4265 29.3929C38.5448 25.1654 35.3676 21.7151 31.1012 20.3519C29.1078 19.7148 27.6231 18.1026 27.2109 16.1271L26.5701 13.0555C26.2087 11.3225 24.4502 10.1986 22.6424 10.5452Z"
        fill="#F47226"
      />
      <path
        d="M6.09047 43.9885C7.70025 43.314 9.57261 43.5973 10.8873 44.7147C14.4887 47.7765 19.7302 48.2855 23.8991 45.9781L24.8462 45.4537C26.4426 44.5701 26.9896 42.613 26.0679 41.0825C25.1462 39.5521 23.1047 39.0273 21.5082 39.9113L20.5612 40.4353C18.8806 41.3654 16.7679 41.1602 15.3166 39.9263C12.0547 37.1538 7.41007 36.4507 3.4161 38.1245L2.11875 38.6685C0.429741 39.3763 -0.340656 41.263 0.397699 42.8822C1.13605 44.5018 3.10411 45.2404 4.79312 44.5325L6.09047 43.9885Z"
        fill="#F47226"
      />
      <path
        d="M23.4856 31.9633C22.5532 31.0695 21.0418 31.0695 20.1094 31.9633C19.177 32.857 19.177 34.3061 20.1094 35.1996C21.0418 36.0934 22.5532 36.0934 23.4856 35.1996C24.4176 34.3061 24.4176 32.857 23.4856 31.9633Z"
        fill="#F47226"
      />
    </svg>
  ),
  inflationIcons: (props: LucideProps) => (
    <svg
      width="109"
      height="109"
      viewBox="0 0 109 109"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.18552 112.011C0.178981 101.114 14.3817 75.3481 48.0812 71.465C72.187 68.6872 79.2418 45.5576 72.1845 29.8312C63.8847 11.3357 89.1855 -9.47656 109.186 9.51725"
        stroke="#F47226"
        strokeOpacity="0.2"
        strokeWidth="3"
        strokeDasharray="5 5"
      />
      <path
        d="M75.7804 67.5933C77.1149 69.3329 77.3945 71.2238 76.6197 73.2663C75.8449 75.3089 74.3075 76.6486 72.0072 77.2857C70.9072 77.5901 69.7851 77.6024 68.6409 77.3214C67.4967 77.0407 66.5588 76.5095 65.8273 75.728C63.174 76.8844 60.6812 76.8281 58.3489 75.5582C56.0165 74.2881 54.615 72.2245 54.1443 69.367C52.9834 69.0909 51.9968 68.5469 51.1844 67.7349C50.372 66.9229 49.786 65.8988 49.4266 64.6626C48.8495 62.6781 49.3087 60.8197 50.804 59.0874C52.2994 57.3551 54.0345 56.6022 56.0094 56.8286L59.4785 57.2388C59.8519 56.0457 60.4964 54.9796 61.412 54.0406C62.3276 53.1015 63.4093 52.4241 64.6571 52.0082L63.9193 49.4707C63.7963 49.0478 63.8363 48.6589 64.0392 48.3039C64.2422 47.9489 64.5603 47.7114 64.9937 47.5914C65.427 47.4714 65.8256 47.5104 66.1893 47.7084C66.5531 47.9065 66.7965 48.2169 66.9194 48.6399L67.7708 51.5678C69.1082 51.584 70.2882 51.8636 71.3105 52.4066C72.3329 52.9495 73.326 53.8257 74.2901 55.0351L77.19 54.2319C77.6236 54.1119 78.0219 54.1509 78.3859 54.349C78.7496 54.547 78.9928 54.8575 79.1158 55.2804C79.239 55.7033 79.1989 56.0923 78.9961 56.4473C78.7929 56.8023 78.4748 57.0398 78.0415 57.1598L75.4414 57.8799C75.7341 59.1346 75.7284 60.3841 75.4238 61.6284C75.1192 62.8728 74.545 63.9634 73.7005 64.9002L75.7804 67.5933ZM63.7204 72.1985C63.465 71.3202 63.2917 70.4457 63.2005 69.5745C63.1093 68.7034 63.1002 67.8359 63.1731 66.972C62.5105 67.5422 61.7588 68.0228 60.918 68.4138C60.0771 68.8049 59.2139 69.0879 58.3283 69.2628C58.6972 70.5315 59.3631 71.428 60.326 71.9523C61.2889 72.4767 62.4204 72.5588 63.7204 72.1985ZM57.6932 65.2205C58.7599 64.9251 59.6638 64.5342 60.4048 64.0477C61.1458 63.5613 62.0529 62.7477 63.1259 61.6069L56.4161 60.8287C55.3359 60.706 54.5132 60.9427 53.9481 61.5386C53.383 62.1345 53.2281 62.8716 53.4835 63.75C53.7295 64.5958 54.1926 65.1354 54.8728 65.3689C55.553 65.6023 56.4931 65.5529 57.6932 65.2205ZM70.8721 73.3816C71.7055 73.1511 72.2976 72.6793 72.6488 71.9671C73.0002 71.2545 72.9524 70.6261 72.5059 70.0821L67.8761 64.1932C67.5454 65.4096 67.3564 66.5868 67.3091 67.7248C67.2618 68.8628 67.3612 69.8547 67.6071 70.7004C67.9193 71.7741 68.3498 72.5425 68.8987 73.0054C69.4476 73.4687 70.1054 73.594 70.8721 73.3816ZM71.0222 61.6346C71.261 61.217 71.4023 60.7121 71.4462 60.1199C71.4902 59.5278 71.427 58.9389 71.2567 58.3533C70.954 57.3123 70.3486 56.5309 69.4404 56.009C68.5323 55.4872 67.5615 55.3694 66.5281 55.6555C65.9281 55.8217 65.3898 56.0762 64.9132 56.4192C64.4366 56.7621 64.067 57.1632 63.8043 57.6226L68.2154 58.2992L71.0222 61.6346Z"
        fill="#F47226"
      />
    </svg>
  ),
  clockIcons: (props: LucideProps) => (
    <svg
      width="93"
      height="90"
      viewBox="0 0 93 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M87.5514 30.6731C84.1205 32.0029 80.4113 32.384 76.793 31.7785C73.1747 31.173 69.7734 29.6021 66.9277 27.222C64.082 24.8419 61.891 21.7356 60.5729 18.2124C59.2547 14.6892 58.8554 10.8718 59.4146 7.14025C49.8295 4.25455 39.5963 4.63115 30.2357 8.21408C20.875 11.797 12.8864 18.3951 7.457 27.0278C2.02758 35.6605 -0.552902 45.8671 0.0990036 56.131C0.750909 66.3949 4.60041 76.1683 11.0755 83.9988L15.9079 90.0002H77.2533L81.9803 83.9988C87.9806 76.7283 91.7245 67.7704 92.7278 58.2841C93.731 48.7978 91.9474 39.2197 87.6077 30.789L87.5514 30.6731ZM43.7142 11.2266C44.6146 11.2266 45.4868 11.2266 46.5279 11.2266C47.569 11.2266 48.4975 11.2266 49.3416 11.3715V21.515H43.7142V11.2266ZM15.5774 56.4955H5.8983C5.8983 55.3652 5.75762 54.2639 5.75762 53.1047C5.75762 51.9454 5.75762 51.4817 5.75762 50.6992H15.5774V56.4955ZM22.6397 32.8467L15.5774 25.7173C16.8247 24.2515 18.1691 22.8764 19.6009 21.6019L26.5226 28.7314L22.6397 32.8467ZM87.27 56.5824H77.2533V50.7862H87.1856C87.1856 51.5976 87.1856 52.3801 87.1856 53.1916C87.1856 54.0031 87.2419 55.3652 87.1575 56.4955L87.27 56.5824Z"
        fill="#F47226"
        fillOpacity="0.2"
      />
      <path
        d="M51.6381 59.999C50.5461 61.1342 49.1713 61.9374 47.665 62.3204C46.1586 62.7033 44.579 62.6513 43.0995 62.1698C41.62 61.6884 40.298 60.7963 39.2786 59.5915C38.2592 58.3867 37.582 56.9158 37.3212 55.3404C37.0605 53.765 37.2263 52.1461 37.8006 50.6615C38.3748 49.1768 39.3352 47.8839 40.5763 46.9248C41.8173 45.9657 43.291 45.3774 44.8355 45.2247C46.3799 45.072 47.9354 45.3606 49.3309 46.059L63.9175 31.2888C65.0384 30.1538 66.8732 30.1616 67.9843 31.3061C69.0636 32.4178 69.0553 34.1885 67.9656 35.29L53.2701 50.1454C53.9949 51.7691 54.2163 53.5835 53.9041 55.3415C53.592 57.0994 52.874 58.7446 51.6381 59.999Z"
        fill="#F47226"
      />
      <path
        d="M77.8881 25.7143C84.9504 25.7143 90.6756 19.9579 90.6756 12.8571C90.6756 5.75634 84.9504 0 77.8881 0C70.8257 0 65.1006 5.75634 65.1006 12.8571C65.1006 19.9579 70.8257 25.7143 77.8881 25.7143Z"
        fill="#F47226"
      />
    </svg>
  ),
  lightning: (props: LucideProps) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="ph:lightning-fill">
<path id="Vector" d="M13.3656 7.8413L6.36559 15.3413C6.29141 15.4205 6.19349 15.4734 6.08661 15.492C5.97974 15.5106 5.8697 15.494 5.7731 15.4446C5.67651 15.3952 5.5986 15.3157 5.55113 15.2182C5.50366 15.1206 5.48921 15.0103 5.50996 14.9038L6.42621 10.3207L2.82434 8.96818C2.74698 8.93924 2.678 8.8916 2.62355 8.8295C2.5691 8.7674 2.53089 8.69277 2.51232 8.6123C2.49374 8.53183 2.4954 8.448 2.51713 8.36832C2.53886 8.28864 2.57998 8.21559 2.63684 8.15568L9.63684 0.655679C9.71102 0.576514 9.80893 0.523624 9.91581 0.50499C10.0227 0.486356 10.1327 0.502989 10.2293 0.55238C10.3259 0.601771 10.4038 0.681239 10.4513 0.778793C10.4988 0.876346 10.5132 0.986692 10.4925 1.09318L9.57371 5.6813L13.1756 7.03193C13.2524 7.06106 13.3208 7.10865 13.3748 7.17051C13.4288 7.23236 13.4668 7.30657 13.4853 7.38658C13.5039 7.46658 13.5024 7.54992 13.4811 7.62923C13.4598 7.70854 13.4192 7.78138 13.3631 7.8413H13.3656Z" fill="#E1C782"/>
</g>
</svg>

  ),
  ...WalletTxnIcons,
  ...FavIcons,
};
