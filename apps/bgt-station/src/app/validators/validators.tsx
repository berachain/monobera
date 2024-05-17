"use client";

import React from "react";
import { Card } from "@bera/ui/card";
import { Skeleton } from "@bera/ui/skeleton";

import ValidatorsTable from "./components/validators-table";

export default function Validators() {
  const isLoading = false;
  const generalInfo = [
    {
      amount: "69",
      text: "Total Validators",
      img: (
        <div className="absolute right-3 bottom-3">
          <svg
            width="64"
            height="79"
            viewBox="0 0 64 79"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="64"
              height="79"
              rx="5"
              fill="#F47226"
              fill-opacity="0.2"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M28.8077 16.6428C30.3722 14.4524 33.6277 14.4524 35.1923 16.6428L35.4414 16.9915C35.7166 17.377 36.179 17.5834 36.6498 17.5311L37.76 17.4077C40.2587 17.1301 42.3699 19.2414 42.0923 21.74L41.969 22.8502C41.9167 23.321 42.123 23.7833 42.5085 24.0587L42.8573 24.3077C45.0476 25.8722 45.0476 29.1277 42.8573 30.6923L42.5085 30.9414C42.123 31.2166 41.9167 31.679 41.969 32.1498L42.0923 33.26C42.3699 35.7587 40.2587 37.8699 37.76 37.5923L36.6498 37.469C36.179 37.4167 35.7166 37.623 35.4414 38.0085L35.1923 38.3573C33.6277 40.5476 30.3724 40.5476 28.8077 38.3573L28.5587 38.0085C28.2833 37.623 27.821 37.4167 27.3502 37.469L26.24 37.5923C23.7414 37.8699 21.6301 35.7587 21.9077 33.26L22.0311 32.1498C22.0834 31.679 21.877 31.2166 21.4915 30.9414L21.1428 30.6923C18.9524 29.1277 18.9524 25.8724 21.1428 24.3077L21.4915 24.0587C21.877 23.7833 22.0834 23.321 22.0311 22.8502L21.9077 21.74C21.6301 19.2414 23.7414 17.1301 26.24 17.4077L27.3502 17.5311C27.821 17.5834 28.2833 17.377 28.5587 16.9915L28.8077 16.6428ZM36.8476 23.96C37.3583 24.4707 37.3583 25.2987 36.8476 25.8093L31.8538 30.8032C31.2124 31.4447 30.1723 31.4447 29.5309 30.8032L27.1524 28.4247C26.6417 27.914 26.6417 27.086 27.1524 26.5754C27.6631 26.0647 28.491 26.0647 29.0017 26.5754L30.6924 28.266L34.9984 23.96C35.509 23.4494 36.337 23.4494 36.8476 23.96Z"
              fill="#F47226"
            />
            <rect x="15" y="48" width="34" height="4" rx="2" fill="#F47226" />
            <rect x="5" y="60" width="54" height="4" rx="2" fill="#F47226" />
          </svg>
        </div>
      ),
    },
    {
      amount: "$130.123",
      text: "Total Active Incentives",
      img: (
        <div className="absolute right-3 bottom-3">
          <svg
            width="89"
            height="80"
            viewBox="0 0 89 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M44.5638 69.7461L43.4201 69.3946C33.5695 66.3656 28.6443 64.8513 27.7274 61.2684C26.8101 57.685 30.4815 54.299 37.8233 47.5265L45.0644 40.8478C45.0709 40.8664 45.0777 40.8857 45.0846 40.9063C45.1686 41.1506 45.2903 41.5104 45.4369 41.9627C45.731 42.869 46.1232 44.1377 46.515 45.584C47.3165 48.5446 48.0439 51.9971 48.0439 54.5983C48.0439 57.1995 47.3165 60.652 46.515 63.6126C46.1232 65.0589 45.731 66.3276 45.4369 67.2338C45.2903 67.6861 45.1686 68.0459 45.0846 68.2903C45.0426 68.4125 45.01 68.5058 44.9886 68.5667L44.9646 68.6343L44.959 68.6493L44.5638 69.7461Z"
              fill="#F47226"
              fill-opacity="0.2"
            />
            <path
              d="M68.4983 76.9693C78.3714 79.9477 83.5733 81.194 86.4509 78.5612C89.6372 75.6455 87.6251 70.1221 83.6009 59.0753L76.2252 38.8285C73.466 31.2544 71.8452 26.8049 69.1404 25L69.1631 25.1031C69.1947 25.2465 69.2402 25.4562 69.2976 25.7258C69.4122 26.2651 69.5742 27.0449 69.7655 28.0162C70.1479 29.9577 70.6486 32.6709 71.1227 35.7623C72.0619 41.8868 72.9318 49.7123 72.4837 55.9659C72.2125 59.7496 71.3521 64.4437 70.5843 68.1112C70.1968 69.9623 69.8258 71.5845 69.5516 72.745C69.4144 73.3254 69.3011 73.7912 69.2219 74.1135L69.1296 74.4854L68.4983 76.9693Z"
              fill="#F47226"
              fill-opacity="0.2"
            />
            <path
              d="M63.1425 25L63.3587 25.9872L63.3608 25.9969L63.3686 26.033L63.4007 26.1826C63.429 26.3158 63.4711 26.5151 63.5245 26.7744C63.6315 27.2931 63.7844 28.0511 63.9655 28.9996C64.3282 30.8978 64.8033 33.5523 65.2526 36.5727C66.1598 42.6717 66.9271 50.045 66.5343 55.6952C66.2965 59.116 65.5199 63.5415 64.7786 67.1921C64.4114 69.0005 64.0595 70.5867 63.7996 71.7206C63.6697 72.2873 63.563 72.7397 63.4891 73.0492L63.4042 73.4022L63.3824 73.4911L62.9267 75.339L51.3426 71.6968L51.7799 70.4539C51.8059 70.3786 51.843 70.2704 51.8896 70.1319C51.983 69.8546 52.1144 69.4565 52.2714 68.9611C52.5855 67.9721 53.0036 66.5887 53.4226 65.0061C54.2422 61.9101 55.1353 57.7954 55.1353 54.367C55.1353 50.9385 54.2422 46.8238 53.4226 43.7278C53.0036 42.1452 52.5855 40.7619 52.2714 39.7729C52.1144 39.2775 51.983 38.8794 51.8896 38.6021C51.843 38.4636 51.8059 38.3553 51.7799 38.2801L51.7411 38.1678L50.8335 35.5917L52.9789 33.5678C57.4316 29.3673 60.5281 26.4464 63.1425 25Z"
              fill="#F47226"
              fill-opacity="0.2"
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
        </div>
      ),
    },
    {
      amount: "10%",
      text: "BGT Inflation",
      img: (
        <div className="absolute right-0 bottom-0">
          <svg
            width="109"
            height="109"
            viewBox="0 0 109 109"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.18552 112.011C0.178981 101.114 14.3817 75.3481 48.0812 71.465C72.187 68.6872 79.2418 45.5576 72.1845 29.8312C63.8847 11.3357 89.1855 -9.47656 109.186 9.51725"
              stroke="#F47226"
              stroke-opacity="0.2"
              stroke-width="3"
              stroke-dasharray="5 5"
            />
            <path
              d="M75.7804 67.5933C77.1149 69.3329 77.3945 71.2238 76.6197 73.2663C75.8449 75.3089 74.3075 76.6486 72.0072 77.2857C70.9072 77.5901 69.7851 77.6024 68.6409 77.3214C67.4967 77.0407 66.5588 76.5095 65.8273 75.728C63.174 76.8844 60.6812 76.8281 58.3489 75.5582C56.0165 74.2881 54.615 72.2245 54.1443 69.367C52.9834 69.0909 51.9968 68.5469 51.1844 67.7349C50.372 66.9229 49.786 65.8988 49.4266 64.6626C48.8495 62.6781 49.3087 60.8197 50.804 59.0874C52.2994 57.3551 54.0345 56.6022 56.0094 56.8286L59.4785 57.2388C59.8519 56.0457 60.4964 54.9796 61.412 54.0406C62.3276 53.1015 63.4093 52.4241 64.6571 52.0082L63.9193 49.4707C63.7963 49.0478 63.8363 48.6589 64.0392 48.3039C64.2422 47.9489 64.5603 47.7114 64.9937 47.5914C65.427 47.4714 65.8256 47.5104 66.1893 47.7084C66.5531 47.9065 66.7965 48.2169 66.9194 48.6399L67.7708 51.5678C69.1082 51.584 70.2882 51.8636 71.3105 52.4066C72.3329 52.9495 73.326 53.8257 74.2901 55.0351L77.19 54.2319C77.6236 54.1119 78.0219 54.1509 78.3859 54.349C78.7496 54.547 78.9928 54.8575 79.1158 55.2804C79.239 55.7033 79.1989 56.0923 78.9961 56.4473C78.7929 56.8023 78.4748 57.0398 78.0415 57.1598L75.4414 57.8799C75.7341 59.1346 75.7284 60.3841 75.4238 61.6284C75.1192 62.8728 74.545 63.9634 73.7005 64.9002L75.7804 67.5933ZM63.7204 72.1985C63.465 71.3202 63.2917 70.4457 63.2005 69.5745C63.1093 68.7034 63.1002 67.8359 63.1731 66.972C62.5105 67.5422 61.7588 68.0228 60.918 68.4138C60.0771 68.8049 59.2139 69.0879 58.3283 69.2628C58.6972 70.5315 59.3631 71.428 60.326 71.9523C61.2889 72.4767 62.4204 72.5588 63.7204 72.1985ZM57.6932 65.2205C58.7599 64.9251 59.6638 64.5342 60.4048 64.0477C61.1458 63.5613 62.0529 62.7477 63.1259 61.6069L56.4161 60.8287C55.3359 60.706 54.5132 60.9427 53.9481 61.5386C53.383 62.1345 53.2281 62.8716 53.4835 63.75C53.7295 64.5958 54.1926 65.1354 54.8728 65.3689C55.553 65.6023 56.4931 65.5529 57.6932 65.2205ZM70.8721 73.3816C71.7055 73.1511 72.2976 72.6793 72.6488 71.9671C73.0002 71.2545 72.9524 70.6261 72.5059 70.0821L67.8761 64.1932C67.5454 65.4096 67.3564 66.5868 67.3091 67.7248C67.2618 68.8628 67.3612 69.8547 67.6071 70.7004C67.9193 71.7741 68.3498 72.5425 68.8987 73.0054C69.4476 73.4687 70.1054 73.594 70.8721 73.3816ZM71.0222 61.6346C71.261 61.217 71.4023 60.7121 71.4462 60.1199C71.4902 59.5278 71.427 58.9389 71.2567 58.3533C70.954 57.3123 70.3486 56.5309 69.4404 56.009C68.5323 55.4872 67.5615 55.3694 66.5281 55.6555C65.9281 55.8217 65.3898 56.0762 64.9132 56.4192C64.4366 56.7621 64.067 57.1632 63.8043 57.6226L68.2154 58.2992L71.0222 61.6346Z"
              fill="#F47226"
            />
          </svg>
        </div>
      ),
    },
    {
      amount: "15",
      text: "Active gauges",
      img: (
        <div className="absolute right-3 bottom-0">
          <svg
            width="93"
            height="90"
            viewBox="0 0 93 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M87.5514 30.6731C84.1205 32.0029 80.4113 32.384 76.793 31.7785C73.1747 31.173 69.7734 29.6021 66.9277 27.222C64.082 24.8419 61.891 21.7356 60.5729 18.2124C59.2547 14.6892 58.8554 10.8718 59.4146 7.14025C49.8295 4.25455 39.5963 4.63115 30.2357 8.21408C20.875 11.797 12.8864 18.3951 7.457 27.0278C2.02758 35.6605 -0.552902 45.8671 0.0990036 56.131C0.750909 66.3949 4.60041 76.1683 11.0755 83.9988L15.9079 90.0002H77.2533L81.9803 83.9988C87.9806 76.7283 91.7245 67.7704 92.7278 58.2841C93.731 48.7978 91.9474 39.2197 87.6077 30.789L87.5514 30.6731ZM43.7142 11.2266C44.6146 11.2266 45.4868 11.2266 46.5279 11.2266C47.569 11.2266 48.4975 11.2266 49.3416 11.3715V21.515H43.7142V11.2266ZM15.5774 56.4955H5.8983C5.8983 55.3652 5.75762 54.2639 5.75762 53.1047C5.75762 51.9454 5.75762 51.4817 5.75762 50.6992H15.5774V56.4955ZM22.6397 32.8467L15.5774 25.7173C16.8247 24.2515 18.1691 22.8764 19.6009 21.6019L26.5226 28.7314L22.6397 32.8467ZM87.27 56.5824H77.2533V50.7862H87.1856C87.1856 51.5976 87.1856 52.3801 87.1856 53.1916C87.1856 54.0031 87.2419 55.3652 87.1575 56.4955L87.27 56.5824Z"
              fill="#F47226"
              fill-opacity="0.2"
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
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4">
        {generalInfo.map((info, index) => (
          <Card
            className="h-[150px] border-border bg-muted p-6 text-left relative"
            key={info.text + index}
          >
            <div className="text-xs font-medium leading-[14px] text-muted-foreground">
              {info.text}
            </div>
            {isLoading ? (
              <Skeleton className="mt-4 h-[45px] w-[120px]" />
            ) : (
              <div className="mt-4 text-2xl font-semibold leading-loose text-foreground">
                {info.amount}
              </div>
            )}
            {info.img}
          </Card>
        ))}
      </div>
      <ValidatorsTable />
    </div>
  );
}
