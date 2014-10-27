var password;

function checkForUser( object, pid ) {

    var xmlhttp;
    var odpowiedzSerwera;

    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            odpowiedzSerwera = JSON.parse( xmlhttp.responseText );
            alert( odpowiedzSerwera[0] );
        }
    }

    var url = "http://len.iem.pw.edu.pl/staff/~chaberb/apps/register/check/"+object.value;

    xmlhttp.open('GET', url, true);

    xmlhttp.send( null );
}

function funkcja( arr ) {

    for( var i=0; i<arr.length; i++ ) {
        alert( arr[i] );
    }
}

function removeElement( id ) {

    var parent = document.getElementById( id );
    var child = document.getElementById( id + "span" );

    if( !child ) return;

    parent.removeChild( child );
}

function checkString( object, pId ) {

    var string = object.value.toLowerCase();
    var charArray = string.split( '' );

    removeElement( pId );

    if( string.length < 3 ) {
        createWarning( pId, "Za krótkie" );
        return;
    }

    for( var i=0; i < charArray.length; i++ ) {

        if( charArray[i] < 'a' || charArray[i] > 'z' ) {

            createWarning( pId, "Błąd" );
            break;
        }
    }
}

function createWarning( id, string ) {

    var element = document.createElement("span");
    element.style.color = "red";
    element.setAttribute( 'id', id + "span" );

    //var tekst = document.createTextNode( string );
   //element.appendChild( tekst );

    var strong = document.createElement( "strong" );
    strong.appendChild( document.createTextNode( string ) );
    strong.style.fontSize = "80%";
    element.appendChild( strong );

    var p = document.getElementById( id );
    p.appendChild( element );

}

function checkPassword( object, pid ) {

    var numbers = 0;
    var extraChars = 0;
    var error = 0;

    var string = object.value;

    removeElement( pid );

    if( string.length < 5 ) {
        createWarning( pid, "Za krótkie" );
        error++;

    } else {
        var charArray = string.split( '' );

        for( var i=0; i < charArray.length; i++ ) {

            if( charArray[i] < 'a' || charArray[i] > 'z' ) {
                if( charArray[i] >= 0 && charArray[i] <= 9 ) numbers++;
                else extraChars++;
            }
        }

        if( numbers == 0 ) {
            createWarning( pid, "Brak cyfer" );
            error++;
        } else if( extraChars == 0 ) {
            createWarning( pid, "Brak znaków specjalnych" );
            error++;
        } else {
            password = string;
        }


    }

    if( error > 0 ) {
        var haslo2 = document.getElementById( "inputhaslo2" );
        haslo2.style.background = "black";

        haslo2.setAttribute( 'disabled', 'disabled' );
    } else {
        var haslo2 = document.getElementById( "inputhaslo2" );

        haslo2.removeAttribute( 'disabled' );
        haslo2.style.background = "white";
    }

}

function isTheSame( object, pid ) {

    removeElement(pid);
    if( object.value != password ) {
        createWarning( pid, "Nie takie same" );
    }
}

function checkEmail( object, pid ) {

    var email = object.value;

    removeElement( pid );

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if( !re.test(email) ) {
        createWarning( pid, "Nieprawidłowy format" );
    }
}

function checkPesel( object, pid ) {

    removeElement( pid );

    var pesel = object.value.split( '' );

    if( pesel.length != 11 ) {
        createWarning( pid, "Nieprawidłowy nr PESEL");
        return;
    }

    for( var i=0; i < pesel.length; i++ ) {
        if( pesel[i] < '0' || pesel[i] > '9' ) {
            createWarning( pid, "Nieprawidłowy nr PESEL" );
            return;
        }
    }

    var rok = parseInt( pesel[0]+""+pesel[1] );
    var miesiac = parseInt( pesel[2]+""+pesel[3] );
    var dzien = parseInt( pesel[4]+""+pesel[5] );
    var nrid = parseInt( pesel[6]+""+pesel[7]+""+pesel[8]+""+pesel[9]+""+pesel[10] );

    if( miesiac > 12 || dzien > 31 ) {
        createWarning( pid, "Nieprawidłowy nr PESEL" );
        return;
    }

    if( parseInt(pesel[9]) %2 == 0 ) {
        var radio = document.getElementById( 'female');
        radio.setAttribute( 'checked', 'checked' );
    } else {
        var radio = document.getElementById( 'male');
        radio.setAttribute( 'checked', 'checked' );
    }

}

function checkDate( object, pid ) {
    //TODO
}

