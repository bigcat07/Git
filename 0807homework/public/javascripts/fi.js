/**
 * Created by dllo on 17/8/7.
 */
var newpassword = document.getElementById('new');
var affirm = document.getElementById('affirm');
var biaodan = document.getElementById('biaodan');
biaodan.onsubmit = function () {
    if (newpassword.value !== affirm.value) {
        alert('两次密码不一样')
        return false;
    }
}
