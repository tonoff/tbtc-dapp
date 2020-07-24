import React from 'react'

const BTCLogo = ({ width, height }) => {
    return (
        <svg className="btclogo" width={width} height={height} viewBox="0 0 272 272" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M136.036 241.726C194.506 241.726 241.905 194.326 241.905 135.856C241.905 77.3858 194.506 29.9864 136.036 29.9864C77.5655 29.9864 30.1661 77.3858 30.1661 135.856C30.1661 194.326 77.5655 241.726 136.036 241.726ZM136.036 271.271C210.823 271.271 271.45 210.643 271.45 135.856C271.45 61.0686 210.823 0.441406 136.036 0.441406C61.2483 0.441406 0.621094 61.0686 0.621094 135.856C0.621094 210.643 61.2483 271.271 136.036 271.271Z" fill="#fffdfc"/>
            <path d="M108.16 185.092H144.8C154.868 185.092 162.812 182.558 168.565 177.422C174.318 172.285 177.194 164.957 177.194 155.506C177.194 143.521 172.263 135.576 162.47 131.536C168.565 128.317 172.126 121.4 172.126 113.387C172.126 104.689 169.592 98.183 164.524 93.6629C159.525 89.2113 152.676 86.8828 144.115 86.8828H108.16V185.092ZM126.446 168.244V141.877H143.088C153.703 141.877 158.977 146.26 158.908 155.095C158.908 163.861 153.635 168.244 143.088 168.244H126.446ZM126.446 125.03V103.73H142.677C150.69 103.73 154.594 106.744 154.594 114.414C154.594 122.085 150.759 125.03 143.088 125.03H126.446Z" fill="#111010"/>
            <rect x="122" y="74" width="9" height="30" fill="#111010"/>
            <rect x="142" y="74" width="9" height="30" fill="#111010"/>
            <rect x="122" y="168" width="9" height="30" fill="#111010"/>
            <rect x="142" y="168" width="9" height="30" fill="#111010"/>
        </svg>
    )
}

export default BTCLogo