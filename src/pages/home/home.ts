import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { url } from 'inspector';
import {main} from '../../../src/js/main.js';
import {inflate} from '../../../src/js/inflate.js'
import {deflate} from '../../../src/js/deflate.js'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    $(function(){
	var url = location.href;
	var query = location.search;
	if(query.slice(1) != ""){
		location.href=inflate(query.slice(1));
	}
	$('#url').keyup(function() {
		var input_url = $('#url').val();
		$("#shorturl").val(url + '?' + deflate(input_url));
	});
});

function clipboadCopy(string){
	var urltext = document.getElementById(string);
    window.getSelection().selectAllChildren(urltext);
    document.execCommand("Copy");
    alert("コピーしました");
}

// 圧縮関数
function deflate(val) {
    val = encodeURIComponent(val);
    val = RawDeflate.deflate(val);
    val = btoa(val); // base64エンコード
    return val;
}

// 復号関数
function inflate(val) {
    val = atob(val); // base64デコード
    val = RawDeflate.inflate(val);
    val = decodeURIComponent(val);
    return val;
}

  }

}
