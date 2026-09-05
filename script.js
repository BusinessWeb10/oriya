/* =====================================================
   ORIYA — SCRIPT.JS
===================================================== */


/* =====================================
   REVEAL ON SCROLL
===================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =====================================
   VIDEO AUTOPLAY ON SCROLL
===================================== */

const videos = document.querySelectorAll(".auto-video");

const videoObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            const video = entry.target;

            if (entry.isIntersecting) {

                video.muted = true;

                video.play().catch(() => {});

            } else {

                video.pause();

                video.muted = true;

            }

        });

    },
    {
        threshold: 0.25
    }
);

videos.forEach((video) => {

    video.muted = true;

    video.playsInline = true;

    videoObserver.observe(video);

});


/* =====================================
   SOUND ON HOVER
   במחשב: עוברים עם העכבר = יש קול
===================================== */

const soundVideos = document.querySelectorAll(".sound-video");

soundVideos.forEach((video) => {

    video.addEventListener("mouseenter", () => {

        if (window.matchMedia("(hover: hover)").matches) {

            video.muted = false;

            video.volume = 1;

            video.play().catch(() => {});

        }

    });


    video.addEventListener("mouseleave", () => {

        video.muted = true;

    });

});


/* =====================================
   MOBILE SOUND
   בנייד אין hover
   לחיצה על סרטון מפעילה/מכבה קול
===================================== */

soundVideos.forEach((video) => {

    video.addEventListener("click", () => {

        if (window.matchMedia("(hover: none)").matches) {

            const isMuted = video.muted;

            /*
                קודם משתיקים את שאר הסרטונים
                כדי שלא יהיו כמה סרטונים עם קול יחד
            */

            soundVideos.forEach((otherVideo) => {
                otherVideo.muted = true;
            });

            video.muted = !isMuted;

            video.volume = 1;

            video.play().catch(() => {});

        }

    });

});


/* =====================================
   STOP VIDEOS WHEN TAB IS HIDDEN
===================================== */

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        videos.forEach((video) => {

            video.pause();

            video.muted = true;

        });

    }

});


/* =====================================
   SMOOTH SCROLL
===================================== */

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
  

    });


    }


);


