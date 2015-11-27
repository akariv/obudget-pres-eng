var idx = 0;
function fwd() {
    var toc = $(".toc");
    if ( toc.hasClass('active') ) {
        toc.find('li.pre:first').toggleClass('pre',false).toggleClass('active',true);
        toc.toggleClass('active',false);
    }
    var activeSlide = $(".slide.active");
    var next = $(".slide.pre:first");
    if ( next.size() > 0 ) {
        activeSlide.toggleClass('done',true).toggleClass('active',false);
        idx++;
        window.location.hash = ""+idx;
    }
    if ( activeSlide.attr('data-toc') === 'true') {
        toc.toggleClass('active',true);
        toc.find('li.active').toggleClass('done',true).toggleClass('active',false);
    } else {
        next.toggleClass('active',true).toggleClass('pre',false);
    }
}
function bwd() {
    var toc = $(".toc");
    if ( toc.hasClass('active') ) {
        toc.find('li.done:last').toggleClass('done',false).toggleClass('active',true);
        toc.toggleClass('active',false);
    }
    var activeSlide = $(".slide.active");
    var next = $(".slide.done:last");
    if ( next.size() > 0 ) {
        activeSlide.toggleClass('pre',true).toggleClass('active',false);
        idx--;
        window.location.hash = ""+idx;
    }
    if ( activeSlide.size() > 0 && next.attr('data-toc') === 'true') {
        toc.toggleClass('active',true);
        toc.find('li.active').toggleClass('pre',true).toggleClass('active',false);
    } else {
        next.toggleClass('active',true).toggleClass('done',false);
        // if ( next.size() == 0 ) {
        //     toc.toggleClass('active',true);
        //     toc.find('li.active').toggleClass('active',false).toggleClass('pre',true);
        // }
    }
}
$(window).keypress(function(event) {
    if ( event.which == 32 || event.which == 13 ) {
        fwd();
    }
});
$(window).keyup(function(event) {
    console.log(event.which+" UP");
    if ( event.which == 8 || event.which == 37 ) {
        bwd();
    }
    if ( event.which == 39 ) {
        fwd();
    }
});
$( function() {
    $(".toc li").each( function(i) {
        var ofs = $(this).position();
        $(this).css('left',ofs.left).css('top',ofs.top);
    }).each( function(i) {
        $(this).css('position','absolute');
    });
    $(".slide").each( function(i) {
        var el = $(this);
        el.toggleClass('active',false).toggleClass('done',false).toggleClass('pre',true);
        var img = el.attr('data-img');
        var credit = el.attr('data-img-credit');
        var text = el.html();
        if ( img ) {
            el.html("<img src='"+img+"'></img><p>"+text+"</p><span role='credit'>Image: "+credit+"</span>");
        }
    });
    $(".slide:first").toggleClass('active',true).toggleClass('pre',false);
    var hash = window.location.hash.substring(1);
    hash = parseInt(hash);
    while ( hash > 0 ) {
        fwd();
        hash--;
    }
});
