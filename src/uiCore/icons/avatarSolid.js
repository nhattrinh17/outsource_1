function IconAvatar(data) {
    const { color, className, onClick = () => {} } = data;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            className={className}
            fill={color}
            onClick={onClick}
        >
            <path d="M384 64c0-35.3-28.7-64-64-64H64C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64l0-384zM256 192c0 35.3-28.7 64-64 64s-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64zM80 356.6c0-37.9 30.7-68.6 68.6-68.6h86.9c37.9 0 68.6 30.7 68.6 68.6c0 15.1-12.3 27.4-27.4 27.4H107.4C92.3 384 80 371.7 80 356.6z" />
        </svg>
    );
}

export default IconAvatar;
