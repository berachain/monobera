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
  Edit,
  Expand,
  ExternalLink,
  File,
  FileEdit,
  FileText,
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
  Play,
  Plus,
  PlusCircle,
  PlusSquare,
  Redo,
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
  XOctagon,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

import { FavIcons } from "./fav-icons";
import { WalletTxnIcons } from "./wallet-txn-icons";

export type Icon = LucideIcon;

export const Icons = {
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
  newspaper: Newspaper,
  spinner: Loader2,
  chevronsDown: ChevronsDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronUp: ChevronUp,
  chevronsUp: ChevronsUp,
  chevronDown: ChevronDown,
  edit: Edit,
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
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="20"
      viewBox="0 0 22 20"
      {...props}
    >
      <path
        d="M12.064 12.3924C11.4469 12.1488 10.7809 12.1488 10.1637 12.3924C9.82266 12.5224 9.5303 12.7498 9.54654 13.0584C9.57903 13.5456 10.2612 14.1953 10.716 14.5689C10.9596 14.7638 11.2682 14.7638 11.5118 14.5689C11.9666 14.1953 12.6488 13.5456 12.6812 13.0584C12.6975 12.7335 12.4051 12.5224 12.064 12.3924Z"
        fill="currentColor"
      />
      <path
        d="M7.80886 11.3355C8.34484 11.3355 8.76713 10.6371 8.76713 9.76004C8.76713 8.88297 8.34484 8.18457 7.80886 8.18457C7.27288 8.18457 6.85059 8.88297 6.85059 9.76004C6.85059 10.6371 7.27288 11.3355 7.80886 11.3355Z"
        fill="currentColor"
      />
      <path
        d="M14.5178 11.3355C15.0538 11.3355 15.4761 10.6371 15.4761 9.76004C15.4761 8.88297 15.0538 8.18457 14.5178 8.18457C13.9819 8.18457 13.5596 8.88297 13.5596 9.76004C13.5596 10.6371 13.9819 11.3355 14.5178 11.3355Z"
        fill="currentColor"
      />
      <path
        d="M20.2177 7.94211C21.2247 7.14626 21.8744 5.92811 21.8581 4.54755C21.8581 3.93036 21.712 3.31316 21.4359 2.74469C20.64 1.1205 18.626 -0.0651601 16.7582 0.324646C16.4821 0.389614 15.6212 0.665727 14.9391 1.03929C13.9158 1.59152 12.7302 1.80266 11.5608 1.8189H10.7974C9.62797 1.8189 8.45855 1.59152 7.41906 1.03929C6.7369 0.665727 5.87608 0.373372 5.59997 0.324646C3.7159 -0.0651601 1.71815 1.1205 0.92229 2.74469C0.646177 3.31316 0.5 3.93036 0.5 4.54755C0.5 5.91187 1.13344 7.13002 2.14044 7.94211C2.28661 8.05581 2.35158 8.25071 2.3191 8.44561C0.548726 15.7382 5.87608 19.6363 11.2034 19.75V19.4901C11.2034 19.5713 11.2034 19.6688 11.2034 19.75C16.5308 19.6525 21.8581 15.7545 20.0878 8.44561C20.039 8.25071 20.104 8.05581 20.2664 7.94211H20.2177ZM18.1712 8.15326C17.7327 9.04657 18.2037 9.97236 18.1712 10.8981C18.0575 15.4459 14.663 17.5898 11.2522 17.5736H11.1222C7.71142 17.5736 4.31685 15.4459 4.20316 10.8981C4.15444 9.97236 4.64169 9.03032 4.20316 8.15326C3.92705 7.30868 2.75763 5.68448 2.79011 4.4501C2.85508 3.41061 3.7159 2.56603 4.77163 2.48482C5.14519 2.4361 5.48627 2.50107 5.81111 2.66349C6.16844 2.84215 6.542 3.00457 6.93181 3.1345C7.38658 3.28068 7.8576 3.42686 8.32861 3.52431C8.99453 3.67049 9.66045 3.75169 10.3426 3.80042C10.5862 3.80042 10.8136 3.81666 11.0573 3.81666H11.3821C11.5283 3.81666 11.6745 3.81666 11.8206 3.81666H11.8694C11.8694 3.81666 12.0155 3.81666 12.0967 3.81666C12.7789 3.78418 13.4448 3.68673 14.1107 3.54055C14.5818 3.4431 15.0365 3.29692 15.5075 3.15074C15.8974 3.02081 16.2547 2.85839 16.6282 2.67973C16.9531 2.51731 17.3104 2.4361 17.6677 2.50107C18.7397 2.58228 19.5843 3.42686 19.6492 4.46634C19.6817 5.70073 18.4961 7.32492 18.2362 8.1695L18.1712 8.15326Z"
        fill="currentColor"
      />
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
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
        fill="url(#paint0_linear_2198_2186109)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8638 23.7466C17.8603 20.6984 22.5257 18.6888 24.8601 17.7179C31.5251 14.9456 32.91 14.4641 33.8127 14.4482C34.0113 14.4447 34.4552 14.4939 34.7427 14.7272C34.9855 14.9242 35.0523 15.1904 35.0843 15.3771C35.1163 15.5639 35.1561 15.9895 35.1244 16.3219C34.7633 20.1169 33.2004 29.3263 32.4053 33.5767C32.0689 35.3752 31.4065 35.9782 30.7652 36.0373C29.3714 36.1655 28.3131 35.1162 26.9632 34.2313C24.8509 32.8467 23.6576 31.9847 21.6072 30.6336C19.2377 29.0721 20.7738 28.2139 22.1242 26.8113C22.4776 26.4442 28.6183 20.8587 28.7372 20.352C28.7521 20.2886 28.7659 20.0524 28.6255 19.9277C28.4852 19.803 28.2781 19.8456 28.1286 19.8795C27.9168 19.9276 24.5423 22.158 18.0053 26.5707C17.0475 27.2284 16.1799 27.5489 15.4026 27.5321C14.5457 27.5135 12.8973 27.0475 11.6719 26.6492C10.1689 26.1606 8.97432 25.9023 9.07834 25.0726C9.13252 24.6404 9.72767 24.1984 10.8638 23.7466Z"
        fill="currentColor"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2198_2186109"
          x1="24"
          y1="0"
          x2="24"
          y2="47.644"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2AABEE" />
          <stop offset="1" stopColor="#229ED9" />
        </linearGradient>
      </defs>
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
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M40.634 9.03283C37.5747 7.62906 34.294 6.59483 30.8638 6.00248C30.8013 5.99105 30.7389 6.01962 30.7067 6.07676C30.2848 6.82719 29.8175 7.80619 29.4902 8.57568C25.8008 8.02334 22.1304 8.02334 18.5166 8.57568C18.1893 7.78909 17.705 6.82719 17.2811 6.07676C17.249 6.02153 17.1866 5.99296 17.1241 6.00248C13.6958 6.59294 10.4151 7.62717 7.35387 9.03283C7.32737 9.04425 7.30465 9.06332 7.28958 9.08806C1.06678 18.3848 -0.637901 27.453 0.19836 36.4088C0.202144 36.4526 0.22674 36.4945 0.260796 36.5211C4.36642 39.5362 8.34341 41.3666 12.2466 42.5799C12.309 42.599 12.3752 42.5761 12.415 42.5247C13.3383 41.2638 14.1613 39.9344 14.867 38.5363C14.9086 38.4544 14.8688 38.3572 14.7837 38.3249C13.4783 37.8297 12.2352 37.2259 11.0395 36.5402C10.9449 36.485 10.9373 36.3497 11.0243 36.2849C11.2759 36.0964 11.5276 35.9002 11.7679 35.7021C11.8114 35.6659 11.872 35.6583 11.9231 35.6811C19.7786 39.2677 28.2831 39.2677 36.0459 35.6811C36.097 35.6564 36.1576 35.664 36.203 35.7002C36.4433 35.8983 36.6949 36.0964 36.9484 36.2849C37.0354 36.3497 37.0298 36.485 36.9352 36.5402C35.7394 37.2392 34.4964 37.8297 33.189 38.323C33.1039 38.3554 33.0661 38.4544 33.1077 38.5363C33.8285 39.9324 34.6515 41.2619 35.5578 42.5228C35.5957 42.5761 35.6637 42.599 35.7262 42.5799C39.6483 41.3666 43.6252 39.5362 47.7309 36.5211C47.7668 36.4945 47.7895 36.4545 47.7933 36.4107C48.7942 26.0568 46.117 17.063 40.6964 9.08995C40.6832 9.06332 40.6605 9.04425 40.634 9.03283ZM16.04 30.9556C13.675 30.9556 11.7263 28.7844 11.7263 26.1178C11.7263 23.4512 13.6372 21.2799 16.04 21.2799C18.4617 21.2799 20.3916 23.4703 20.3538 26.1178C20.3538 28.7844 18.4428 30.9556 16.04 30.9556ZM31.9895 30.9556C29.6245 30.9556 27.6758 28.7844 27.6758 26.1178C27.6758 23.4512 29.5867 21.2799 31.9895 21.2799C34.4113 21.2799 36.3411 23.4703 36.3033 26.1178C36.3033 28.7844 34.4113 30.9556 31.9895 30.9556Z"
        fill="#5865F2"
      />
    </svg>
  ),
  ...WalletTxnIcons,
  ...FavIcons,
};
