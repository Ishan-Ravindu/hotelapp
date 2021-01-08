import React from 'react'
import { View } from 'react-native'
import { SliderBox } from "react-native-image-slider-box"

function Banner({ bannerImage }) {
    return (
        <View >

            <SliderBox
                images={bannerImage}
                sliderBoxHeight={150}
                // onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                dotColor="#FFEE58"
                inactiveDotColor="#90A4AE"
                paginationBoxVerticalPadding={20}
                autoplay
                circleLoop
                resizeMethod={'resize'}
                resizeMode={'cover'}
                paginationBoxStyle={{
                    position: "absolute",
                    bottom: 0,
                    padding: 0,
                    alignItems: "center",
                    alignSelf: "center",
                    justifyContent: "center",
                    paddingVertical: 10
                }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    padding: 0,
                    margin: 0,
                    backgroundColor: "rgba(128, 128, 128, 0.92)"
                }}
                ImageComponentStyle={{ borderRadius: 15, width: '97%', marginTop: 5, marginBottom: 10 }}
                imageLoadingColor="#2196F3"
            />
        </View>

    );
}


export default Banner;