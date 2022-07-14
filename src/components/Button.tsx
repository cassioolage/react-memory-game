type Props = {
    label: string;
    icon?: any;
    onClick: React.MouseEventHandler<HTMLDivElement>
}

export const Button = ({ label, icon, onClick }: Props) => {
    return (
        <div className="w-48 h-12 flex bg-blue-600 rounded-lg cursor-pointer opacity-100 transition-opacity delay-300 hover:opacity-80" onClick={onClick}>
            { icon && 
                <div className="h-12 flex justify-center items-center border-r border-gray-100 p-3">
                    <img className="h-5" src={icon} alt="" />
                </div>
            }
            <div className="h-12 text-gray-100 flex justify-center items-center flex-1 px-5">{label}</div>
        </div>
    )
}