/**
 * @author Fabrice
 *
 * patterne : Module
 * Objet avec une partie visible pour la lecture et
 * l'ecriture et une partie privée accessible
 * uniquement depuis l'interieur de la class js
 */

var collectionThree = ( function()
{
    // privates
    var arr = [];

    function privateMethod()
    {
        //...
    }

    return {// dans les accolade du return, sont placé les var et methode public accessible depuis l'exterieur

        add : function(elm)
        {
            console.log(arr);
        },

        suppr : function(elm)
        {
            
        },

        size : function()
        {
            
        },

        animate : function()
        {
            
        }

    };
}());
