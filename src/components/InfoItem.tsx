type Props = {
    label: string;
    value: string;
}
export const InfoItem = ({ label, value}: Props) => {
    return (
        <div className="mb-5">
            <div className="text-sm text-gray-500 md:text-center">{label}</div>
            <div className="text-4xl font-bold text-gray-800 md:text-center">{value}</div>
        </div>
    )
}