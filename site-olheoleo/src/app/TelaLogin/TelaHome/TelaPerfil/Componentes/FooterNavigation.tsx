import Image from 'next/image';

const FooterNavigation = () => {
    return (
        <footer className="bg-txt w-full h-1/5 flex flex-col justify-between fixed bottom-0">
            <div className="flex items-center justify-center text p-2">
                <div className="flex items-center">
                    <Image src="/logo.png" alt="Ícone" width={150} height={60} />
                </div>
                <div className="flex flex-col items-center text-sm md:text-base">
                    <span>Av. Bahia, 1739 - Indaiá, Caraguatatuba - SP, 11665-071</span>
                    <span>olheeoleo@gmail.com.br</span>
                    <span>(00) 0 0000-0000 | (00) 0 0000-0000</span>
                </div>
            </div>
            <div className="text-center pb-2">
                <span className="text-xs md:text-sm">Copyright © 2024</span>
            </div>
        </footer>
    );
}

export default FooterNavigation;
