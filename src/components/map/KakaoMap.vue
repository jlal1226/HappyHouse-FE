<template>
    <div>
        <div id="map"></div>
    </div>
</template>

<script>
import Constant from '@/util/Constant';

export default {
    name : 'KakaoMap',
    data() {
        return {
            map : null,
            positions: [],
            markers : [],
        };
    },
    computed : {
        searched(){
            return this.$store.state.searched;
        }
    },
    watch :{
        'searched' : 'mark' 
    },
    created() {
    },
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
            this.mark();
        },
        mark() {
            this.positions = [];
            if (this.searched.length === 0) return;
            this.searched.forEach((elem) => {
                let latlng = new kakao.maps.LatLng(elem.lat, elem.lng);
                let title = elem.apartmentName;
                let aptCode = elem.aptCode;
                this.positions.push({
                    latlng,
                    title,
                    aptCode
                })
            });
            this.loadMaker();
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
                
                kakao.maps.event.addListener(marker, 'click', () => {
                    this.showDetail(position.aptCode, position.title);
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
        showDetail(aptCode, title){
            this.$store.dispatch(Constant.SET_APT_CODE_NAME, {aptCode, title}); 
        }
    },


}
</script>

<style scoped>
    #map {
        position: absolute;
        width : 100%;
        height : 900px;
        z-index: -1;
    }
</style>

