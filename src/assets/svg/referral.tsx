import {FC} from "react";

interface ISvgMinProps {
  width?: number;
  height?: number;
}

export const QuestionSvg: FC<ISvgMinProps> = ({width = 50, height = 50}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="25" fill="#091B3F"/>
      <path
        d="M24.6937 14.825C23.1094 14.825 21.825 16.1094 21.825 17.6938C21.825 18.75 20.9687 19.6063 19.9125 19.6063C18.8563 19.6063 18 18.75 18 17.6938C18 13.9969 20.997 11 24.6937 11C28.3905 11 31.3875 13.9969 31.3875 17.6938C31.3875 19.5064 30.6646 21.1541 29.4954 22.3577C29.26 22.5997 29.0356 22.8241 28.8214 23.038L28.8206 23.0389C28.2706 23.5883 27.7887 24.0698 27.3659 24.6132C26.8074 25.3307 26.6063 25.8583 26.6063 26.3V28.2125C26.6063 29.2687 25.75 30.125 24.6937 30.125C23.6375 30.125 22.7812 29.2687 22.7812 28.2125V26.3C22.7812 24.6292 23.559 23.2767 24.3475 22.2639C24.9306 21.5144 25.6638 20.7826 26.2589 20.1888C26.4385 20.0097 26.6052 19.8431 26.7516 19.6924C27.2555 19.1738 27.5625 18.4716 27.5625 17.6938C27.5625 16.1094 26.2781 14.825 24.6937 14.825Z"
        fill="white"/>
      <path
        d="M24.6937 38.4125C26.1021 38.4125 27.2438 37.2709 27.2438 35.8625C27.2438 34.4541 26.1021 33.3125 24.6937 33.3125C23.2854 33.3125 22.1437 34.4541 22.1437 35.8625C22.1437 37.2709 23.2854 38.4125 24.6937 38.4125Z"
        fill="white"/>
    </svg>
  )
}

export const CloseSvg: FC<ISvgMinProps> = ({width = 50, height = 50}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50ZM36.3588 39.192L39.192 36.3588L28.0167 25.1836L39.192 14.0084L36.3588 11.1752L25.1836 22.3504L14.0084 11.1752L11.1752 14.0084L22.3504 25.1836L11.1752 36.3588L14.0084 39.192L25.1836 28.0167L36.3588 39.192Z"
            fill="#091B3F"/>
    </svg>
  )
}

export const CopySvg: FC<ISvgMinProps> = ({width = 40, height = 40}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M28.6667 1.79163H7.16667C5.19583 1.79163 3.58333 3.40413 3.58333 5.37496V30.4583H7.16667V5.37496H28.6667V1.79163ZM26.875 8.95829H14.3333C12.3625 8.95829 10.7679 10.5708 10.7679 12.5416L10.75 37.625C10.75 39.5958 12.3446 41.2083 14.3154 41.2083H34.0417C36.0125 41.2083 37.625 39.5958 37.625 37.625V19.7083L26.875 8.95829ZM14.3333 37.625V12.5416H25.0833V21.5H34.0417V37.625H14.3333Z"
        fill="black"/>
    </svg>
  )
}

export const CompleteSvg: FC<ISvgMinProps> = ({width = 70, height = 45}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 70 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M15.168 37.6489C17.4762 39.3494 20.7378 38.9598 22.5645 36.765L45.1607 9.61599C46.1022 8.48471 45.9326 6.81729 44.7818 5.8917C43.631 4.96611 41.9348 5.13285 40.9933 6.26413L18.3971 33.4132L9.69269 26.9956C8.50316 26.1186 6.81563 26.3556 5.92349 27.5249C5.03135 28.6943 5.27243 30.3532 6.46195 31.2302L15.168 37.6489ZM17.4983 26.134L12.9234 22.7611C9.35485 20.13 4.29227 20.841 1.61584 24.349C-1.06058 27.8571 -0.337362 32.8337 3.23121 35.4648L11.9356 41.8823C16.5522 45.286 23.0776 44.5075 26.7319 40.1169L27.4944 39.2007L30.5675 41.6174C35.1757 45.2415 41.8927 44.5445 45.6297 40.0545L68.174 12.9679C70.9987 9.57401 70.4899 4.57175 67.0375 1.79498C63.5851 -0.981797 58.4965 -0.481568 55.6718 2.91227L51.1434 8.35305C51.2704 5.91782 50.2586 3.45751 48.1915 1.79498C44.7391 -0.981796 39.6505 -0.481571 36.8258 2.91226L17.4983 26.134ZM37.2948 33.3508L35.3659 31.8338L31.956 35.9308L33.9312 37.4841C34.7525 38.1295 35.7092 38.5018 36.683 38.6104C38.4392 38.8062 40.2561 38.1486 41.4583 36.7075C41.4597 36.7059 41.461 36.7043 41.4623 36.7027L64.0057 9.61713C64.9473 8.48585 64.7786 6.81729 63.6278 5.8917C62.477 4.96611 60.7808 5.13285 59.8392 6.26413L37.2948 33.3508Z"
            fill="#091B3F"/>
      <path
        d="M37.2948 33.3508L35.3659 31.8338L31.956 35.9308L33.9312 37.4841C34.7525 38.1295 35.7092 38.5018 36.683 38.6104C38.4392 38.8062 40.2561 38.1486 41.4583 36.7075L41.4623 36.7027L64.0057 9.61713C64.9473 8.48585 64.7786 6.81729 63.6278 5.8917C62.477 4.96611 60.7808 5.13285 59.8392 6.26413L37.2948 33.3508Z"
        fill="#61B941"/>
      <path
        d="M22.5645 36.765C20.7378 38.9598 17.4762 39.3494 15.168 37.6489L6.46195 31.2302C5.27243 30.3532 5.03135 28.6943 5.92349 27.5249C6.81563 26.3556 8.50316 26.1186 9.69269 26.9956L18.3971 33.4132L40.9933 6.26413C41.9348 5.13285 43.631 4.96611 44.7818 5.8917C45.9326 6.81729 46.1022 8.48471 45.1607 9.61599L22.5645 36.765Z"
        fill="#61B941"/>
    </svg>

  )
}