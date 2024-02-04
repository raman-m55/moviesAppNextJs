import Image from "next/image";
import { HomePage, TopPage } from "@/components";
 
 export default function Home() {
   return (
    <main className="mi-nh[150vh]">
      <TopPage/>
      <HomePage/>
     </main>
   );
 }