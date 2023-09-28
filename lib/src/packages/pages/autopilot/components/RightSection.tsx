import React from 'react'
import { newsParserSettings } from 'globals';
// https://www.buymeacoffee.com/4832232T

export function RightSection() {
    return (
        <div className='pt-2 pb-2 ps-3 pe-3 mb-2'>
            <h2 className='np-fs-22 flex-column align-items-center'>
                Autopilot Parsing&nbsp; <span className="badge bg-primary">Beta</span>
            </h2>
            <p>
                The autopilot parsing feature is currently in beta mode. Please be aware that it may have some bugs or unexpected behavior. Use it carefully.
            </p>
            <p>
                If you have any thoughts, feedback, or proposals, feel free to connect with the author:
            </p>
            <ul className='d-flex flex-column ps-0'>
                <li>
                    <a href="https://www.instagram.com/wp_news_parser" aria-label="Instagram - Connect with the author">
                        <img alt='Instagram icon' className='me-2' height={'27px'} src={newsParserSettings.pluginUrl + '/public/images/clipart1375168_d6sh2a.png'} ></img>
                        Instagram
                    </a>
                </li>
                <li>
                    <a href="https://discord.gg/mxhJ9hE4" aria-label="Discord - Connect with the author">
                        <img alt='Discord icon' className='me-2' height={'27px'} src={newsParserSettings.pluginUrl + '/public/images/discord-icon-43742_qoe0fc.png'} ></img>
                        Discord
                    </a>
                </li>
            </ul>
        </div>

    )
}