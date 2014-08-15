/*
var blogInfo={};
//��content_script����Ϣ������ʱ
chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
	blogInfo=request;
});
*/

//��Ҫ��ס�Ĺ�����ӣ�Ĭ�ϣ�
var defaultBlockUrls=[
"http://same.stockstar.com/*"
];
//��ǰ��Ҫ��ס�Ĺ������
var currentBlockUrls=getBlockUrls();

chrome.webRequest.onBeforeRequest.addListener(function(details) {  
        setBadge();
		//return {cancel: true};
		return {redirectUrl: "about:blank"};
},{urls: currentBlockUrls},["blocking"]);

//������ʾ����ʾ�ڵ�ǰҳ�浲ס�˶��ٹ��
function setBadge(){
	chrome.tabs.getSelected(null, function(tab) {
		tab.blockCount=tab.blockCount||0;
		tab.blockCount++;
		chrome.browserAction.setBadgeBackgroundColor({tabId:tab.id,color: '#0000FF'});
		chrome.browserAction.setBadgeText({tabId:tab.id,text: tab.blockCount.toString()});
	});
}

function getBlockUrls(){
	var urls=localStorage["BlockUrls"];
	if (urls == undefined) {
		console.log("Initializing BlockUrls to defaults.");
		setFilters(defaultBlockUrls);
		return defaultBlockUrls;
	} else {
		return JSON.parse(urls);
	}
}

function setBlockUrls(urls) {
    currentBlockUrls=urls;
	localStorage["BlockUrls"] = JSON.stringify(urls);
}