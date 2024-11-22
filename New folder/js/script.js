finishGame = false;
var audioPlay = false;
var isDone = ['false', 'false', 'false', 'false'];

$(document).ready(function () {

    setTimeout(function () {
        document.getElementById('loadGame').style.display = 'none';
        document.getElementById('Game').style.display = 'block';
        document.getElementById('showRole').style.display = 'block';



        $('.svgE')
            .draggable({
                drag: function (event, ui) {
                    if (finishGame == false) {
                        var Y = $(this).parent().position().top;
                        var X = $(this).parent().position().left;
                        var position = ui.position;


                        var tagE = $(this).prop('tagName');
                        if (tagE == "circle") {


                            var $circle = $(this);

                            var IidE = $(this).prop('id');

                            var usageOldElement = document.querySelectorAll("[for='" + IidE + "']")[0];

                            usageOldElement.setAttribute('value', 'false');

                            var E = document.getElementById("usageEle");
                            E.setAttribute('xlink:href', "#" + $circle.prop('id'));
                            var radius = $circle.prop('r').baseVal.value;
                            if ((position.left + radius) - X > radius && (position.left + radius) - X < ($(this).parent().width() - radius)) {
                                $circle.prop('cx').baseVal.value = (position.left + radius) - X;
                            }
                            if ((position.top + radius) - Y > radius && (position.top + radius) - Y < ($(this).parent().height() - radius)) {
                                $circle.prop('cy').baseVal.value = (position.top + radius) - Y;
                            }


                        } else if (tagE == "rect") {

                            var $element = $(this);

                            var IidE = $(this).prop('id');
                            var usageOldElement = document.querySelectorAll("[for='" + IidE + "']")[0];
                            usageOldElement.setAttribute('value', 'false');

                            var E = document.getElementById("usageEle");
                            E.setAttribute('xlink:href', "#" + $element.prop('id'));

                            if (position.left - X > 0 && position.left - X < ($(this).parent().width() - $(this).width())) {
                                $element.prop('x').baseVal.value = position.left - X;
                            }
                            if (position.top - Y > 0 && position.top - Y < ($(this).parent().height() - $(this).height())) {
                                $element.prop('y').baseVal.value = position.top - Y;
                            }

                        } else {

                            var $element = $(this).parent();
                            var IidE = $(this).parent().prop('id');
                            var usageOldElement = document.querySelectorAll("[for='" + IidE + "']")[0];
                            usageOldElement.setAttribute('value', 'false');

                            var E = document.getElementById("usageEle");
                            E.setAttribute('xlink:href', "#" + $element.prop('id'));
                            var spicialY = $(this).parent().parent().position().top;
                            var picialX = $(this).parent().parent().position().left;

                           ///******************* */
                           var IidE = $(this).parent().prop('id');;
                           //var usageOldElement = document.querySelectorAll("[for='" + $element + "']")[0];
                         
                           var svg = document.getElementById(IidE);
                           var bb = svg.getBBox();
                           var bbWidth = bb.width;
                           var bbHeight = bb.height;
                           /********************* */

                            if (position.left - picialX > 0 && position.left - picialX < (parseInt($(this).parent().parent().width()) - bbWidth )) {
                                $element.prop('x').baseVal.value = position.left - picialX;
                            }
                            if(position.top - spicialY > 0 && position.top - spicialY < (parseInt($(this).parent().parent().height()) - bbHeight )){
                            $element.prop('y').baseVal.value = position.top - spicialY;
                            }
                        }
                    }
                }

            })
            .bind('mouseup', function (event, ui) {

                var Y = $(this).parent().position().top;
                var X = $(this).parent().position().left;


                var color = $(this).attr('fill');
                console.log(color)
                var tagE = $(this).prop('tagName');
                if (tagE == "circle") {

                    var audio = new Audio('audio/circle.mp3');
                    audio.play();

                    audio.onended = function () {
                        audio = new Audio('audio/' + color + '.mp3');
                        audio.play();
                    };



                    var $circle = $(this);
                    var IidE = $(this).prop('id');
                    var usageOldElement = document.querySelectorAll("[for='" + IidE + "']")[0];


                    DropRadius = $circle.prop('r').baseVal.value;
                    DropCX = $circle.prop('cx').baseVal.value;
                    DropCY = $circle.prop('cy').baseVal.value;

                    var oldR = usageOldElement.getAttribute('r');
                    var oldX = usageOldElement.getAttribute('cx');
                    var oldY = usageOldElement.getAttribute('cy');
                    if (color == 'black') {
                        console.log(oldX)
                        if (DropCX - DropRadius > 80 && DropCX + DropRadius < 580 && DropCY - DropRadius > 400 && DropCY + DropRadius < 650) {

                            usageOldElement.setAttribute('value', 'true');
                            var audio = new Audio('audio/clapping.mp3');
                            audio.play();

                            for (let i = 0; i < isDone.length; i++) {
                                if (isDone[i] == 'false') {
                                    isDone[i] = 'true'
                                    break;
                                }
                            }


                        } else {

                            oldAttr = usageOldElement.getAttribute('value');
                            if (oldAttr == 'true') {
                                for (let i = 0; i < isDone.length; i++) {
                                    if (isDone[i] == 'true') {
                                        isDone[i] = 'false'
                                        break;
                                    }
                                }
                            }
                            $circle.prop('cx').baseVal.value = oldX;
                            $circle.prop('cy').baseVal.value = oldY;
                        }
                    } else if (color == 'red') {
                        if (DropCX - DropRadius > 680 && DropCX + DropRadius < 1150 && DropCY - DropRadius > 400 && DropCY + DropRadius < 650) {
                            usageOldElement.setAttribute('value', 'true');
                            var audio = new Audio('audio/clapping.mp3');
                            audio.play();

                            for (let i = 0; i < isDone.length; i++) {
                                if (isDone[i] == 'false') {
                                    isDone[i] = 'true'
                                    break;
                                }
                            }

                        } else {
                            oldAttr = usageOldElement.getAttribute('value');
                            if (oldAttr == 'true') {
                                for (let i = 0; i < isDone.length; i++) {
                                    if (isDone[i] == 'true') {
                                        isDone[i] = 'false'
                                        break;
                                    }
                                }
                            }
                            $circle.prop('cx').baseVal.value = oldX;
                            $circle.prop('cy').baseVal.value = oldY;
                        }
                    } else {
                        oldAttr = usageOldElement.getAttribute('value');
                        if (oldAttr == 'true') {
                            for (let i = 0; i < isDone.length; i++) {
                                if (isDone[i] == 'true') {
                                    isDone[i] = 'false'
                                    break;
                                }
                            }
                        }
                        $circle.prop('cx').baseVal.value = oldX;
                        $circle.prop('cy').baseVal.value = oldY;
                    }

                } else if (tagE == "rect") {

                    var audio = new Audio('audio/rectangle.mp3');
                    audio.play();

                    audio.onended = function () {
                        audio = new Audio('audio/' + color + '.mp3');
                        audio.play();
                    };

                    var $element = $(this);
                    var IidE = $(this).prop('id');
                    var usageOldElement = document.querySelectorAll("[for='" + IidE + "']")[0];
                    DropCX = $element.prop('x').baseVal.value;
                    DropCY = $element.prop('y').baseVal.value;
                    oldX = usageOldElement.getAttribute('x');
                    oldY = usageOldElement.getAttribute('y');

                    if (color == 'black') {

                        if (DropCX > 80 && DropCX + 150 < 580 && DropCY > 400 && DropCY + 100 < 650) {
                            usageOldElement.setAttribute('value', 'true');
                            var audio = new Audio('audio/clapping.mp3');
                            audio.play();

                            for (let i = 0; i < isDone.length; i++) {
                                if (isDone[i] == 'false') {
                                    isDone[i] = 'true'
                                    break;
                                }
                            }


                        } else {
                            oldAttr = usageOldElement.getAttribute('value');
                            if (oldAttr == 'true') {
                                for (let i = 0; i < isDone.length; i++) {
                                    if (isDone[i] == 'true') {
                                        isDone[i] = 'false'
                                        break;
                                    }
                                }
                            }
                            $element.prop('x').baseVal.value = oldX;
                            $element.prop('y').baseVal.value = oldY;
                        }
                    } else if (color == 'red') {
                        if (DropCX > 680 && DropCX + 150 < 1150 && DropCY > 400 && DropCY + 100 < 650) {

                            usageOldElement.setAttribute('value', 'true');
                            var audio = new Audio('audio/clapping.mp3');
                            audio.play();

                            for (let i = 0; i < isDone.length; i++) {
                                if (isDone[i] == 'false') {
                                    isDone[i] = 'true'
                                    break;
                                }
                            }

                        } else {
                            oldAttr = usageOldElement.getAttribute('value');
                            if (oldAttr == 'true') {
                                for (let i = 0; i < isDone.length; i++) {
                                    if (isDone[i] == 'true') {
                                        isDone[i] = 'false'
                                        break;
                                    }
                                }
                            }
                            $element.prop('x').baseVal.value = oldX;
                            $element.prop('y').baseVal.value = oldY;
                        }
                    } else {
                        oldAttr = usageOldElement.getAttribute('value');
                        if (oldAttr == 'true') {
                            for (let i = 0; i < isDone.length; i++) {
                                if (isDone[i] == 'true') {
                                    isDone[i] = 'false'
                                    break;
                                }
                            }
                        }
                        $element.prop('x').baseVal.value = oldX;
                        $element.prop('y').baseVal.value = oldY;
                    }

                } else {

                    var audio = new Audio('audio/' + $(this).prop('id') + '.mp3');
                    audio.play();

                    var ids = $(this).prop('id');
                    audio.onended = function () {

                        if (color != "" + $(this).prop('id') + "") {
                            audio = new Audio('audio/but.mp3');
                            audio.play();
                            audio.onended = function () {
                                console.log("color " + color)
                                if (color == 'black' || color == 'red' || color == 'yellow') {
                                    audio = new Audio('audio/' + color + '.mp3');
                                    audio.play();
                                } else {
                                    audio = new Audio('audio/Purple.mp3');
                                    audio.play();
                                }
                            }
                        }
                        else if (color == 'black' || color == 'red' || color == 'yellow') {
                            audio = new Audio('audio/' + color + '.mp3');
                            audio.play();
                        } else {
                            audio = new Audio('audio/Purple.mp3');
                            audio.play();
                        }
                    };

                    var $element = $(this).parent().prop('id');
                    var IidE = $(this).parent();
                    var usageOldElement = document.querySelectorAll("[for='" + $element + "']")[0];
                    console.log(color)
                    var svg = document.getElementById($element);
                    var bb = svg.getBBox();
                    var bbWidth = bb.width;
                    var bbHeight = bb.height;
                    DropX = IidE.prop('x').baseVal.value;
                    DropY = IidE.prop('y').baseVal.value;
                    oldX = usageOldElement.getAttribute('x');
                    oldY = usageOldElement.getAttribute('y');
                    if (color == 'black') {

                        if (DropX > 80 && DropX + bbWidth < 580 && DropY > 400 && DropY + bbHeight < 650) {
                            usageOldElement.setAttribute('value', 'true');

                            var audio = new Audio('audio/clapping.mp3');
                            audio.play();

                            for (let i = 0; i < isDone.length; i++) {
                                if (isDone[i] == 'false') {
                                    isDone[i] = 'true'
                                    break;
                                }
                            }

                        } else {
                            oldAttr = usageOldElement.getAttribute('value');
                            if (oldAttr == 'true') {
                                for (let i = 0; i < isDone.length; i++) {
                                    if (isDone[i] == 'true') {
                                        isDone[i] = 'false'
                                        break;
                                    }
                                }
                            }
                            IidE.prop('x').baseVal.value = oldX;
                            IidE.prop('y').baseVal.value = oldY;

                        }
                    } else if (color == 'red') {
                        if (DropX > 680 && DropX + bbWidth < 1150 && DropY > 400 && DropY + bbHeight < 650) {
                            usageOldElement.setAttribute('value', 'true');

                            var audio = new Audio('audio/clapping.mp3');
                            audio.play();

                            for (let i = 0; i < isDone.length; i++) {
                                if (isDone[i] == 'false') {
                                    isDone[i] = 'true'
                                    break;
                                }
                            }


                        } else {
                            oldAttr = usageOldElement.getAttribute('value');
                            if (oldAttr == 'true') {
                                for (let i = 0; i < isDone.length; i++) {
                                    if (isDone[i] == 'true') {
                                        isDone[i] = 'false'
                                        break;
                                    }
                                }
                            }
                            IidE.prop('x').baseVal.value = oldX;
                            IidE.prop('y').baseVal.value = oldY;
                        }
                    } else {
                        oldAttr = usageOldElement.getAttribute('value');
                        if (oldAttr == 'true') {
                            for (let i = 0; i < isDone.length; i++) {
                                if (isDone[i] == 'true') {
                                    isDone[i] = 'false'
                                    break;
                                }
                            }
                        }
                        IidE.prop('x').baseVal.value = oldX;
                        IidE.prop('y').baseVal.value = oldY;
                    }
                }
                var Done = true;
                for (let i = 0; i < isDone.length; i++) {
                    console.log(isDone[i])
                    if (isDone[i] == 'false') {
                        Done = false;
                        break;
                    }
                }
                if (Done == true) {

                    finishGame = true;
                    document.getElementById('winningRight').style.display = 'block';
                    document.getElementById('winningLeft').style.display = 'block';

                    var audio = new Audio('audio/clapping.mp3');
                    audio.play();
                    audio.onended = function () {
                        audio = new Audio('audio/clapping.mp3');
                        audio.play();
                    }

                }

            });
    }, 5000)
});

