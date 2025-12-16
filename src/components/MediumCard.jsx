export const MediumCard = ({ title, content }) => {
    return (
        <div className="border-1 border-gray-300 rounded-3xl p-4">
            <div>{title}</div>
            <div>{content}</div>
        </div>
    )
}