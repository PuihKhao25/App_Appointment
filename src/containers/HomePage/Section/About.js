import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {
    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông Baby
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400"
                            src="https://www.youtube.com/embed/iTRM_5v2GVQ"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
                    picture-in-picture" allowFullScreen>

                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>thì hiện tại đơn diễn tả một sự thật hiển nhiên, một thói quen, một lịch trình kế hoạch
                            cụ thể
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
