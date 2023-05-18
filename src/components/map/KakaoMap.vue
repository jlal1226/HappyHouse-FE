<template>
    <div>
        <div id="map"></div>
    </div>
</template>

<script>
export default {
    name : 'KakaoMap',
    data() {
        return {
            map : null,
            positions: [],
            markers : [],
        };
    },
    created() {},
    mounted() {
        if (window.kakao && window.kakao.maps) this.loadMap();
        else this.loadScript();
    },
    methods: {
        loadScript() {
            const script = document.createElement("script");
            script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=" + process.env.VUE_APP_KAKAO_MAP_API_KEY + "&autoload=false";

            /* global kakao */
            script.onload = () => window.kakao.maps.load(this.loadMap);
            document.head.appendChild(script);
        },
        loadMap() {
            const container = document.getElementById("map");
            const options = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
            };

            this.map = new window.kakao.maps.Map(container, options);
        },
        
        loadMaker() {
            
            this.deleteMarker();
            this.markers = [];
            this.positions.forEach((position) => {
                const marker = new kakao.maps.Marker({
                    map: this.map,
                    position: position.latlng, 
                    title: position.title, 
                });
                this.markers.push(marker);
            });
            
            const bounds = this.positions.reduce(
                (bounds, position) => bounds.extend(position.latlng),
                new kakao.maps.LatLngBounds()
            );

            this.map.setBounds(bounds);
        },
        deleteMarker() {
            if (this.markers.length > 0) {
                this.markers.forEach((item) => {
                console.log(item);
                item.setMap(null);
                });
            }
        },
    },


}
</script>

<style scoped>
    #map {
        position: absolute;
        left : 0px;
        top : 0px;
        width : 100%;
        height : 700px;
        z-index: -1;
    }
</style>

