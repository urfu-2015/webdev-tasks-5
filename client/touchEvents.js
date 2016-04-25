document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        return;
    }
    handleTouchStart(event);
});

document.addEventListener('touchend', function(event) {
    if (event.touches.length > 1) {
        return;
    }
    handleTouchEnd(event);
});

document.addEventListener('touchmove', function(event) {
    if (event.touches.length > 1) {
        return;
    }
    handleTouchMove(event);
});

var touch = {};

function handleTouchStart(event) {
    touch.startTime = (new Date()).getTime();
    touch.startPosition = {
        pageX: event.changedTouches[0].pageX,
        pageY: event.changedTouches[0].pageY
    };
    touch.startTarget = event.target;
}

function  handleTouchEnd(event) {
    let load = document.querySelector('.root__load');

    load.classList.remove('root__load_spinning');
    load.style.top = '-30px';

    if (Math.abs(touch.startPosition.pageX - event.changedTouches[0].pageX) < 5 &&
        Math.abs(touch.startPosition.pageY - event.changedTouches[0].pageY) < 5)
    {
        event.target.dispatchEvent(new Event('tap', { bubbles: true }));

        return;
    }

    if (Math.abs(touch.startPosition.pageY - event.changedTouches[0].pageY) < 20 &&
        touch.startPosition.pageX - event.changedTouches[0].pageX > 50)
    {
        event.target.dispatchEvent(new Event('swipe-left', { bubbles: true }));

        return;
    }

    if (Math.abs(touch.startPosition.pageY - event.changedTouches[0].pageY) < 20 &&
        event.changedTouches[0].pageX - touch.startPosition.pageX > 50)
    {
        event.target.dispatchEvent(new Event('swipe-right', { bubbles: true }));

        return;
    }


    if (window.pageYOffset + 60 < event.changedTouches[0].pageY - touch.startPosition.pageY) {
        event.target.dispatchEvent(new Event('scroll-load', { bubbles: true }));

        return;
    }
}

function handleTouchMove(event) {
    if (window.pageYOffset + 60 >= event.changedTouches[0].pageY - touch.startPosition.pageY) {
        let load = document.querySelector('.root__load');

        load.classList.add('root__load_spinning');
        load.style.top =
            (-30 + event.targetTouches[0].pageY - touch.startPosition.pageY - window.pageYOffset)+'px';
    }
}
