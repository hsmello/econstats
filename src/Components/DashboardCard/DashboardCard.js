import React from 'react';
import './DashboardCard.css'

export default function DashboardCard({ wrapClass, frontClass, title, output, note, cardIcon }) {

    return (
        <div className={`${wrapClass} ca_wrap_card`}>
            <div className="ca_card_background bg_shadow">
                <div className="card_background_top">
                    <div className="card_backgound_top_title">
                        {title}
                    </div>
                    <div className="card_backgound_top_body">
                        {output}
                    </div>
                </div>
                <div className="card_background_body">
                    {note}
                </div>
            </div>
            <div className={`${frontClass} ca_card_front front_shadow`}>
                {cardIcon}
            </div>
        </div>
    )
}