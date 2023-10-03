import icon from "../../assets/icon-bw.png"
import { BsLinkedin, BsGithub, BsBriefcaseFill, BsMailbox2 } from "react-icons/bs"

const Footer = () => {

    const goTo = (link: string) => {
        window.open(link, '_blank');
    }

    function sendMail() {
        
        const email = 'buitr4gocontact@gmail.com';
        const subject = 'Hi Juan!';
        const body = 'Your Message...';

        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.open(mailtoLink, '_blank');
    }


    return (
        <div className="w-full bg-[var(--graybase-800)]  flex item-center justify-between mt-10 py-8 px-6 items-center transition-all duration-200
        will-change-transform flex-col sm:flex-row">
            <div>
                <img src={icon} alt="Icon"  className="h-[60px] mb-2"/>
                <h1 className="text-zinc-400 font-bold text-sm">Follow Me!</h1>
                <div className="flex mt-4">
                    <BsLinkedin onClick={() => goTo('https://www.linkedin.com/in/juan-d-buitrago/')} size={20} className="text-zinc-400 cursor-pointer hover:text-emerald-400"/>
                    <BsGithub onClick={() => goTo('https://github.com/S4NCHOPANZ4')} size={20} className="text-zinc-400 ml-4 cursor-pointer hover:text-emerald-400"/>
                    <BsBriefcaseFill onClick={() => goTo('https://portfolio5-09.vercel.app')} size={20} className="text-zinc-400 ml-4 cursor-pointer hover:text-emerald-400"/>
                    <BsMailbox2 onClick={() => sendMail()} size={20} className="text-zinc-400 ml-4 cursor-pointer hover:text-emerald-400"/>
                </div>
            </div>
            <div className="flex mt-10 sm:mt-0">
               <div className="mr-10">
                <h1 className="text-zinc-400 font-bold text-[.8rem]">CUSTOMER SERVICE</h1>
                <ul className="text-zinc-400 text-[.7rem] ">
                    <li className="mt-2 hover:text-emerald-400 cursor-pointer">TERMS OF SERVICE</li>
                    <li className="mt-2 hover:text-emerald-400 cursor-pointer">PRIVACY POLICY</li>
                    <li className="mt-2 hover:text-emerald-400 cursor-pointer">SUPPORT</li>
                </ul>
               </div>
               <div className="mr-10">
                <h1 className="text-zinc-400 font-bold text-[.8rem]">MY ACCOUNT</h1>
                <ul className="text-zinc-400 text-[.7rem]">
                    <li className="mt-2 hover:text-emerald-400 cursor-pointer">MY ACCOUNT</li>
                    <li className="mt-2 hover:text-emerald-400 cursor-pointer">AFFILIATE SYSTEM</li>
                    <li className="mt-2 hover:text-emerald-400 cursor-pointer">SUPPORT</li>
                </ul>
               </div>
            </div>
        </div>
    )
}

export default Footer