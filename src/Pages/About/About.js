import React from 'react';
import './About.css'

export default function About() {
    return (
        <div className="about_page">
            <div className="about_title bg_shadow bg_common">
                ABOUT
            </div>

            <div className="about_body">

                <div className="ab_first_block">
                    <div className="ab_first_block_bg bg_shadow bg_common">

                    </div>
                    <div className="ab_first_block_front front_shadow front_common">
                        What is it?
                    </div>

                </div>

                <div className="second_leg">

                    <div className="ab_second_block">
                        <div className="ab_second_block_bg bg_shadow bg_common">

                        </div>
                        <div className="ab_second_block_front front_shadow front_common">
                            Source
                        </div>

                    </div>

                    <div className="ab_third_block">
                        <div className="ab_third_block_bg bg_shadow bg_common">

                        </div>
                        <div className="ab_third_block_front front_shadow front_common">
                            Who am I?
                        </div>
                    </div>

                </div>



            </div>

        </div>
    )
}