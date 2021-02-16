
export default function DoubleBulb({ color = "white", ...props }) {
  return (
    <svg {...props} width="52" height="54" viewBox="0 0 52 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M31.1457 41.3618V49C31.1457 51.2091 32.9365 53 35.1457 53H38.149C40.3582 53 42.149 51.2091 42.149 49V41.3618C42.149 35.5412 46.2803 31.7626 47.6507 29.7207C49.0212 27.6788 50.4002 24.2656 50.4002 20.9913C50.4002 17.1324 48.9512 13.4316 46.3721 10.703C43.7929 7.97434 40.2948 6.44141 36.6474 6.44141C32.9999 6.44141 29.5018 7.97434 26.9226 10.703C24.3435 13.4316 22.8945 17.1324 22.8945 20.9913C22.8945 24.2656 24.2735 27.6788 25.644 29.7207C27.0144 31.7626 31.1457 35.5412 31.1457 41.3618Z" stroke={color} stroke-miterlimit="10" />
      <path d="M9.94351 35.9204V43.5585C9.94351 45.7677 11.7344 47.5585 13.9435 47.5585H16.9469C19.156 47.5585 20.9469 45.7677 20.9469 43.5585V35.9204C20.9469 30.0998 25.0782 26.3212 26.4486 24.2793C27.819 22.2374 29.198 18.8242 29.198 15.5499C29.198 11.691 27.7491 7.99021 25.1699 5.26157C22.5908 2.53293 19.0927 1 15.4452 1C11.7977 1 8.29965 2.53293 5.72049 5.26157C3.14134 7.99021 1.69238 11.691 1.69238 15.5499C1.69238 18.8242 3.07138 22.2374 4.4418 24.2793C5.81223 26.3212 9.94351 30.0998 9.94351 35.9204V43.5585C9.94351 45.7677 11.7344 47.5585 13.9435 47.5585H16.9469C19.156 47.5585 20.9469 45.7677 20.9469 43.5585V35.9204" stroke={color} stroke-miterlimit="10" />
      <path d="M36.9346 23.6738V42.7205" stroke={color} stroke-miterlimit="10" />
      <path d="M16.0186 18.8379V37.8846" stroke={color} stroke-miterlimit="10" />
      <path d="M21.1758 42.7207L51.8331 42.7207" stroke={color} stroke-miterlimit="10" />
      <path d="M0.833008 42.7207L10.2881 42.7207" stroke={color} stroke-miterlimit="10" />
      <path d="M0.833008 37.8848L30.3442 37.8848" stroke={color} stroke-miterlimit="10" />
    </svg>

  )
}
