// import React from "react";
// import Sidebar from "../components/Sidebar";
// import Popup from "reactjs-popup";

// const ReactPopup = () => {
//   return (
//     <section className="flex gap-6">
//       <Sidebar />
//       <div className="m-3 text-xl text-gray-900   w-[90%] m-[auto] flex flex-col gap-5">
//         <Popup
//           trigger={<button> Trigger</button>}
//           position="center"
//           modal
//           contentStyle={{
//             height: "70vh",
//             width: "50vw",
//             margin: "auto",
//             borderRadius: "10px",
//             padding: "24px",
//             overflow: "auto",
//             contentClassName: "popup-animate",
//           }}
//           overlayStyle={{
//             background: "rgba(0,0,0,0.5)",
//           }}
//         >
//           <div class=" grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div class="grid gap-4">
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
//                   alt=""
//                 />
//               </div>
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
//                   alt=""
//                 />
//               </div>
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
//                   alt=""
//                 />
//               </div>
//             </div>
//             <div class="grid gap-4">
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
//                   alt=""
//                 />
//               </div>
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
//                   alt=""
//                 />
//               </div>
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
//                   alt=""
//                 />
//               </div>
//             </div>
//             <div class="grid gap-4">
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
//                   alt=""
//                 />
//               </div>
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
//                   alt=""
//                 />
//               </div>
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
//                   alt=""
//                 />
//               </div>
//             </div>
//             <div class="grid gap-4">
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
//                   alt=""
//                 />
//               </div>
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
//                   alt=""
//                 />
//               </div>
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
//                   alt=""
//                 />
//               </div>
//             </div>
//             <div class="grid gap-4">
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
//                   alt=""
//                 />
//               </div>
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
//                   alt=""
//                 />
//               </div>
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
//                   alt=""
//                 />
//               </div>
//             </div>
//             <div class="grid gap-4">
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
//                   alt=""
//                 />
//               </div>
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
//                   alt=""
//                 />
//               </div>
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
//                   alt=""
//                 />
//               </div>
//             </div>
//             <div class="grid gap-4">
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
//                   alt=""
//                 />
//               </div>
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
//                   alt=""
//                 />
//               </div>
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
//                   alt=""
//                 />
//               </div>
//             </div>
//             <div class="grid gap-4">
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
//                   alt=""
//                 />
//               </div>
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
//                   alt=""
//                 />
//               </div>
//               <div>
//                 <img
//                   class="h-auto max-w-full rounded-lg"
//                   src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
//                   alt=""
//                 />
//               </div>
//             </div>
//           </div>
//         </Popup>
//       </div>
//     </section>
//   );
// };

// export default ReactPopup;

import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";

export default function App() {
  return (
    <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
      <div>hey</div>
    </Menu>
  );
}
