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
                    <div className="ab_first_block_front front_shadow front_common">
                        What is it?
                    </div>

                    <div className="ab_first_block_bg bg_shadow bg_common">
                        <div className="ab_first_block_body">
                            <p>
                                This is just a simple mini-dashboard version of some selected countries data.
                            </p>
                            <p>
                                The Country Analysis page is filled mainly with CSV data, while all other pages the data comes through API. The only goal was to try both approaches.
                            </p>
                            <p>
                                The code can be found in my github page. Suit yourself :)
                            </p>
                        </div>
                    </div>

                </div>

                <div className="second_leg">

                    <div className="ab_second_block">
                        <div className="ab_second_block_front front_shadow front_common">
                            Source
                        </div>
                        <div className="ab_second_block_bg bg_shadow bg_common">

                            <div className="ab_second_block_body">
                                <p>
                                    The HDI index was taken from the United Nations Development Programme, more specifically the Human Development Reports. This data can be accessed online through <a href="http://hdr.undp.org/en/data" target="blank" >here</a>
                                </p>
                                <p>
                                    All the other indexes (GDP, GDP per capita, Population, Life Expectancy and Inflation) were taken from the World Bank Open Data <a href="https://data.worldbank.org/" target="blank">website</a> and API.
                                </p>


                            </div>
                        </div>

                    </div>

                    <div className="ab_third_block">
                        <div className="ab_third_block_front front_shadow front_common">
                            Who am I?
                        </div>
                        <div className="ab_third_block_bg bg_shadow bg_common">
                            <div className="ab_third_block_body">
                                Hello! I am Hugo and I've been lerning somethings about web development. You can find my github page here and my website here. See you!
                            </div>
                        </div>
                    </div>

                </div>



            </div>

        </div>
    )
}