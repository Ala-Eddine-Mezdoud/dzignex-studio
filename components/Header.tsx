import ShinyText from "./ShinyText"

type HeaderProps = {
    microTitle: string
    title: string
    description: string
}

const Header = ({ microTitle, title, description }: HeaderProps) => {
    return (
        <div className="flex justify-center items-center flex-wrap gap-5 text-center mb-16">
            {/* About Button */}
            <div className='w-full flex flex-wrap justify-center '>
                <ShinyText
                    text={microTitle}
                    speed={2}
                    delay={0}
                    shineColor="#ffffff"
                    spread={120}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    className="text-2xl"
                />
            </div>
            <div className="space-y-5">
                <h1 className="text-white text-[35px] sm:text-[40px] tracking-[-2px] leading-[42px] font-medium">{title}</h1>
                <p className="text-grey-secondary whitespace-pre-line">{description}</p>
            </div>
        </div>
    )
}

export default Header