var music_nameArry = ["아이유 - 사랑이 잘", "아이유 - 밤편지", "바닐라 어쿠스틱 - 대화가 필요해",
    "볼빨간사춘기 - 남이 될 수 있을까", "먼데이키즈 - 발자국", "정키 - 부담이 돼", "닥터심슨 - 말이 안 나와",
    "윤종신 - 내일 할 일"
];

var musicArry = ["./music02/아이유 - 사랑이 잘.mp3", "./music02/아이유 - 밤편지.mp3",
    "./music02/바닐라 어쿠스틱 - 대화가 필요해.mp3", "./music02/볼빨간사춘기 - 남이 될 수 있을까.mp3",
    "./music02/먼데이키즈 - 발자국.mp3", "./music02/정키 - 부담이 돼.mp3", "./music02/닥터심슨 - 말이 안 나와.mp3",
    "./music02/윤종신 - 내일 할 일.mp3"
];

var myAudio;
var thisSong;
thisSong = musicArry[0];

// 초기화
function mInit() {
    for (var i = 0; i < music_nameArry.length; i++) {
        document.getElementById("songlist").innerHTML += "<option>" + music_nameArry[i] + "</option>";
    }
    myAudio = document.getElementById("Music");
    musicName();
}
var sw = 0;

// 재생 목록 
function musicList() {
    if (sw == 1) {
        document.getElementById("songlist").style.display = "none";
        document.getElementById("add").style.visibility = "hidden";
        sw = 0;
    } else {
        sw = 1;
        document.getElementById("songlist").style.display = "block";
        document.getElementById("add").style.visibility = "visible";
    }
}

// input file 실행
function addSong() {
    document.getElementById("addfile").click();

}

// 음악 추가
function addFile() {
    var addSongName;
    addSongName = document.getElementById("addfile").value;
    musicArry.push("./music02/" + addSongName.slice(12));
    var mpnum = addSongName.indexOf(".mp3");
    music_nameArry.push(addSongName.substring(12, mpnum));
    document.getElementById("songlist").innerHTML += "<option>" + addSongName.substring(12, mpnum) + "</option>";
}

// 음악 선택
function select() {
    select_song = document.getElementById("songlist");
    thisSong = musicArry[select_song.selectedIndex];
    myAudio.src = thisSong;
    select_song.style.display = "none";
    document.getElementById("add").style.visibility = "hidden";
    mplay();
    musicName();
}

// 첫 곡으로
function mFirst() {
    thisSong = musicArry[0];
    myAudio.src = thisSong;
    mplay();
    musicName();
}

// 이전 곡으로
function mPrevious() {
    for (var i = 1; i < musicArry.length; i++) {
        if (thisSong == musicArry[i]) {
            thisSong = musicArry[i - 1];
            musicName();
            break;
        }
        if (thisSong == musicArry[0]) {
            document.getElementById("musicTitle").innerHTML = "처음 곡입니다!";
            setTimeout(musicName, 2000);
        }
    }
    mplay();
    //  musicName();
}

// 음악 중지
function mStop() {
    thisSong = musicArry[0];
    myAudio.src = thisSong;
    myAudio.pause;
    musicName();
    document.getElementById("btn_play").src = "./img/btn3_1.png";
    document.getElementById("mid").style.backgroundImage = `url("./img/mid.png")`;
}

// 마지막 곡으로
function mLast() {
    thisSong = musicArry[musicArry.length - 1];
    myAudio.src = thisSong;
    mplay();
    musicName();
}

// 다음 곡으로
function mNext() {
    for (var i = 0; i < musicArry.length; i++) {
        if (thisSong == musicArry[i]) {
            thisSong = musicArry[i + 1];
            musicName();
            break;
        }
        if (thisSong == musicArry[musicArry.length - 1]) {
            document.getElementById("musicTitle").innerHTML = "마지막 곡입니다!";
            setTimeout(mLast, 1000);
        }
    }
    mplay();
    // musicName();
}

// 재생
function mplay() {
    myAudio.src = thisSong;
    myAudio.play();
    document.getElementById("btn_play").src = "./img/btn3_2.png";
    document.getElementById("mid").style.backgroundImage = `url("./img/gif.gif")`;
}

// 재생 일시정지
function mPlayPause() {
    if (sw == 1) {
        document.getElementById("btn_play").src = "./img/btn3_2.png";
        myAudio.src = thisSong;
        myAudio.play();
        document.getElementById("mid").style.backgroundImage = `url("./img/gif.gif")`;
        sw = 0;
        musicName();
    } else {
        myAudio.src = thisSong;
        myAudio.pause();
        sw = 1;
        document.getElementById("btn_play").src = "./img/btn3_1.png";
        document.getElementById("mid").style.backgroundImage = `url("./img/mid.png")`;
        musicName();
    }

}
var swLoop = 0;
var btnNum;

// 한곡 반복
function mLoop() {
    if (swLoop == 0) {
        document.getElementById("loopimg").src = "./img/notloop.png";
        document.getElementById("musicTitle").innerHTML += " repeat♬";
        swLoop = 1;
        myAudio.loop = true;
    } else {
        document.getElementById("loopimg").src = "./img/loop.png";
        musicName();
        swLoop = 0;
        myAudio.loop = false;
    }
    // musicName();
}

// 버튼에 마우스 올려 놓았을 때 버튼 변화
function onMouse(btnNum) {
    document.getElementsByName("btn")[btnNum].style.opacity = 1;

}

// 버튼에서 마우스 벗어 났을 때 버튼 변화
function outMouse(btnNum) {
    document.getElementsByName("btn")[btnNum].style.opacity = .4;

}

// 음악 음소거
function musicSound() {
    if (sw == 1) {
        // myAudio.volume = 0;
        document.getElementById("volBar").style.visibility = "visible";
        sw = 0;
    } else {
        sw = 1;
        // myAudio.volume = 1;
        document.getElementById("volBar").style.visibility = "hidden";
    }
}

// 음악 볼륨 조절
function musicVol() {
    myAudio.volume = (document.getElementById("volBar").value / 10);
    if (document.getElementById("volBar").value == 0) {
        document.images[0].src = "./img/btn_top1_2.png";
    } else {
        document.images[0].src = "./img/btn_top1.png";
    }
    console.log(myAudio.volume);
}

// 음악 이름 출력
function musicName() {
    for (var i = 0; i < musicArry.length; i++) {
        if (thisSong == musicArry[i]) {

            document.getElementById("musicTitle").innerHTML = music_nameArry[i];
        }
    }
}