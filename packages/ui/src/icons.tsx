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
  CandlestickChart,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsDown,
  ChevronsRight,
  Circle,
  ClipboardCheck,
  Coins,
  Command,
  Copy,
  CreditCard,
  Edit,
  Expand,
  File,
  FileText,
  Frame,
  Hammer,
  HelpCircle,
  HelpingHand,
  Image,
  Inbox,
  Info,
  InfoIcon,
  Laptop,
  LayoutDashboard,
  LineChart,
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
  Newspaper,
  PieChart,
  Pizza,
  Play,
  Plus,
  PlusCircle,
  PlusSquare,
  Redo,
  Repeat2,
  Reply,
  SearchIcon,
  Settings,
  SortAsc,
  SortDesc,
  SunMedium,
  Timer,
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
  PenSquare,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  lineChart: LineChart,
  pieChart: PieChart,
  alertCircle: AlertCircle,
  activity: Activity,
  reply: Reply,
  minusSquare: MinusSquare,
  plusSquare: PlusSquare,
  sortAsc: SortAsc,
  arrowUpDown: ArrowUpDown,
  arrowDownUp: ArrowDownUp,
  arrowLeft: ArrowLeft,
  sortDesc: SortDesc,
  command: Command,
  chevronsRight: ChevronsRight,
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
  add: Plus,
  minus: Minus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  timer: Timer,
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
  plus: Plus,
  candleStick: CandlestickChart,
  medal: Medal,
  plusCircle: PlusCircle,
  penSquare: PenSquare,
  system: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        d="m11.998 2c5.517 0 9.997 4.48 9.997 9.998 0 5.517-4.48 9.997-9.997 9.997-5.518 0-9.998-4.48-9.998-9.997 0-5.518 4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.497 8.498 8.497z"
        fillRule="nonzero"
        fill="currentColor"
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
      width="31"
      height="28"
      viewBox="0 0 31 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.4539 25.4228C13.3401 25.2237 13.1304 25.1005 12.9026 25.1005H12.8612C12.5687 25.1005 12.5117 25.1005 12.2529 25.1005H6.15167C5.89282 25.1005 5.65208 24.9617 5.52265 24.7338L2.47335 19.3872C2.34392 19.1592 2.34392 18.8789 2.47335 18.651L5.52265 13.3044C5.65208 13.0765 5.89282 12.9377 6.15167 12.9377H12.2529C12.5117 12.9377 12.7525 13.0765 12.8819 13.3044L15.9312 18.651C16.0606 18.8789 16.0606 19.1592 15.9312 19.3872C15.8794 19.4788 15.8794 19.5915 15.9312 19.6832L16.4463 20.5869C16.788 21.1868 17.6422 21.1868 17.9839 20.5869C18.5378 19.6177 18.5378 18.4231 17.9839 17.4513L14.9346 12.1046C14.3806 11.1354 13.3582 10.5381 12.2529 10.5381H6.15167C5.04377 10.5381 4.0213 11.1354 3.46994 12.1046L0.415461 17.4513C-0.138487 18.4205 -0.138487 19.6151 0.415461 20.5869L3.46476 25.9336C4.01871 26.9028 5.04119 27.5001 6.14649 27.5001H12.2684C13.3193 27.4975 13.9742 26.3449 13.4488 25.4228H13.4539Z"
        fill="currentColor"
      />
      <path
        d="M29.7697 17.4519L26.7204 12.1053C26.6661 12.0084 26.6065 11.9167 26.5418 11.8276C26.0836 11.1937 25.1311 11.2434 24.7428 11.9245L24.66 12.0686C24.4425 12.4511 24.4425 12.92 24.6625 13.2998V13.3051L27.717 18.6517C27.8464 18.8796 27.8464 19.1599 27.717 19.3878L24.6677 24.7345C24.5383 24.9624 24.2976 25.1012 24.0387 25.1012H17.9375C17.6787 25.1012 17.4379 24.9624 17.3085 24.7345L14.2592 19.3878C14.1298 19.1599 14.1298 18.8796 14.2592 18.6517L17.3085 13.3051C17.4379 13.0772 17.6787 12.9383 17.9375 12.9383C18.2093 12.9383 18.463 12.7916 18.6002 12.5506L19.0868 11.6966C19.3819 11.1806 19.0143 10.5361 18.4242 10.5361H17.9375C16.8296 10.5361 15.8071 11.1334 15.2558 12.1027L12.2065 17.4493C11.6525 18.4186 11.6525 19.6131 12.2065 20.585L15.2558 25.9316C15.8097 26.9009 16.8322 27.4982 17.9375 27.4982H24.0387C25.1466 27.4982 26.1691 26.9009 26.7204 25.9316L29.7697 20.585C30.3237 19.6157 30.3237 18.4212 29.7697 17.4493V17.4519Z"
        fill="currentColor"
      />
      <path
        d="M24.0127 7.41317L20.9634 2.06653C20.4095 1.09727 19.387 0.5 18.2817 0.5H12.1805C11.0726 0.5 10.0501 1.09727 9.49879 2.06653L6.44949 7.41317L6.42619 7.45246C5.97578 8.24621 6.54268 9.23642 7.44867 9.23642C7.88354 9.23642 8.28476 9.00066 8.49961 8.61819V8.61295L11.5541 3.26632C11.6835 3.03841 11.9243 2.89957 12.1831 2.89957H18.2843C18.5432 2.89957 18.7839 3.03841 18.9133 3.26632L21.9626 8.61295C22.092 8.84086 22.092 9.12116 21.9626 9.34907L18.9133 14.6957C18.7839 14.9236 18.5432 15.0625 18.2843 15.0625H12.1831C11.9243 15.0625 11.6835 14.9236 11.5541 14.6957C11.3988 14.4233 11.1089 14.253 10.7982 14.253H10.0786C9.4056 14.253 8.98626 14.9891 9.32277 15.5811L9.50138 15.8955C10.0553 16.8647 11.0778 17.462 12.1831 17.462H18.2843C19.3922 17.462 20.4147 16.8647 20.966 15.8955L24.0153 10.5489C24.5693 9.57959 24.5693 8.38505 24.0153 7.41317H24.0127Z"
        fill="currentColor"
      />
    </svg>
  ),
  honey: (props: LucideProps) => (
    <svg
      width="24"
      height="24"
      id="HONEY"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 828.46 884.46"
      {...props}
    >
      <path
        id="HONEY-2"
        data-name="HONEY"
        d="m236.31,751.4h-94.88c-16.61,0-31.43-4.01-45.36-11.93-13.93-7.91-24.63-18.95-33.21-33.1l-50.71-88.27c-8.02-13.26-12.15-27.31-12.15-43.24s4.01-29.53,12.15-42.8l51.6-89.61-51.6-89.16c-8.02-13.26-12.15-27.75-12.15-43.24s4.01-29.98,12.15-43.24l50.71-88.27c8.02-14.15,19.28-25.19,33.21-33.1,13.93-7.91,29.2-12.37,45.36-12.37h95.48l50.34-87.52c8.04-14.18,19.31-25.23,33.26-33.15,13.95-7.93,29.25-12.39,45.43-12.39h96.56c16.63,0,31.48,4.02,45.43,12.39,13.95,7.93,24.67,18.98,33.26,33.15l50.79,87.52h95.48c16.61,0,31.43,4.01,45.36,12.37,13.93,7.91,24.63,18.95,33.21,33.1l50.26,88.27c8.02,13.26,12.15,27.31,12.15,43.24s-4.01,29.98-12.15,43.24l-51.6,89.16,51.6,89.61c8.02,13.26,12.15,27.31,12.15,42.8s-4.01,29.98-12.15,43.24l-50.26,88.27c-8.02,14.15-19.28,25.19-33.21,33.1-13.93,7.91-29.2,11.93-45.36,11.93h-94.88l-50.96,87.81c-8.06,14.22-19.38,25.31-33.38,33.26-14,7.95-29.34,11.98-45.59,11.98h-96.88c-16.69,0-31.58-4.03-45.59-11.98-14-7.95-24.75-19.04-33.38-33.26l-50.51-87.81Zm355.43-352.22h96.99l49.62-88.71-49.62-88.71h-96.99l-50.96,88.71,50.96,88.71Zm-224.73,131.76h94.64l50.51-88.71-50.51-88.71h-94.64l-50.51,88.71,50.51,88.71Zm.32-264.81h94.01l51.51-89.44-50.17-86.66h-96.34l-50.17,86.77,51.62,89.33h-.45Zm-79.33,44.35l-50.51-88.71h-95.65l-50.51,88.71,50.51,88.71h95.65l50.51-88.71Zm-.24,264.81l-50.51-88.71h-96.52l-49.62,88.71,50.51,88.71h95.18l50.51-88.71h.45Zm79.25,44.35l-51.86,89.6,50.51,87.81h96.88l50.51-87.81-51.86-89.6h-94.64.45Zm224.73,44.35h95.65l50.51-88.71-50.51-88.71h-95.65l-50.96,88.71,50.96,88.71Z"
        fill="currentColor"
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
};
