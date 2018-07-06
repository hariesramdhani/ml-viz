(function(exports){
    Date.prototype.Format = function(fmt){
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    CHelper = {
        timelast: function (element,callback) {//倒计时
            $(element).on('click', function () {
                $callrest = callback();
                if(!$callrest){
                    return ;
                }
                var _this = $(element);
                _this.off();
                _this.addClass('last');
                var lastsecs = 59;
                _this.html('Resend<span>60</span>S');
                var t = setInterval(function () {
                    if (lastsecs >= 0) {
                        _this.html('Resend<span>' + lastsecs + '</span>S');
                        lastsecs--;
                    } else {
                        _this.removeClass('last');
                        _this.text('send');
                        clearInterval(t);
                        CHelper.timelast(_this[0],callback);
                    }
                }, 1000)
            });
        },
        showdate:function(dd){
            var d = new Date(dd.replace(/\s/, 'T'));
            return d.Format('M-d');
        },
        comparepoint:function(v,sort){
            var v = JSON.parse(v);
            if(v.c1.point> v.c2.point&&sort==1){
                console.log(sort);
                return 'winner';
            }else if(v.c1.point < v.c2.point&&sort==2){
                console.log(sort)
                return 'winner'
            }else{
                return '';
            }
        },
        getjsonattr:function(jsonstr,attr1,attr2){
            var v = JSON.parse(jsonstr);
            return v[attr1][attr2];

        },
        json_encode:function(arr){
            return JSON.stringify(arr);
        },
        usage:function($value){
            var result = parseFloat($value);
            return result*5+'%';
        },
        textoverflow:function(str,num){
            $(""+str).each(function(){
                if($(this).text().length>num){
                    $(this).text($(this).text().substring(0,num));
                    $(this).html($(this).html()+'…');
                }
            });
        },
        commonpic:function(){
          return 'http://img-cdn.mobilelegends.com/Untitled.jpg';
        },
        json_encode:function(arr){
            return JSON.stringify(arr);
        },
        photourl:function(icon){
            return 'http://img-cdn.mobilelegends.com/'+icon;
        },
        hidetoggletip:function(){
            $('.toggleTip').addClass('hide');
            $('.mark').addClass('hide');
        },
        showskilltip:function(portrait,name,desc){
            $('.skilltip img').attr('src',portrait);
            $('.skilltip .content h3').text(name);
            $('.skilltip .content p').html(desc);
            $('.skilltip').removeClass('hide');
            $('.mark').removeClass('hide');
        },
        showsdetailtip:function(name,desc){
            $('.detailtip h2').text(name);
            $('.detailtip p').text(desc);
            $('.detailtip').removeClass('hide');
            $('.mark').removeClass('hide');
        },
        getType:function(type){
            var result = {'1':'','2':'play','3':'peifang'};
            return result[type];
        },
        isOvertime:function(datetime){
            if((typeof datetime == 'string' && datetime.length == 10) || typeof datetime == 'number'){
                datetime = parseInt(datetime);
                datetime = datetime.toString().length == 10? datetime * 1000 : datetime;
            }else{
                datetime = datetime.replace(/-/g, '/');
            }
            var date = new Date(datetime) == 'Invalid Date'? new Date : new Date(datetime),
                tday = Math.floor((new Date).getTime()/86400000 - date.getTime()/86400000),
                from = Math.round(date.getTime() / 1000),
                now = Math.round((new Date).getTime() / 1000),
                time = now - from;
            if(time>0){
                return true;
            }else{
                return false;
            }
        },
        timeFormatetoNormal:function(datetime,fmt){
            if((typeof datetime == 'string' && datetime.length == 10) || typeof datetime == 'number'){
                datetime = parseInt(datetime);
                datetime = datetime.toString().length == 10? datetime * 1000 : datetime;
            }else{
                datetime = datetime.replace(/-/g, '/');
            }
            var date = new Date(datetime) == 'Invalid Date'? new Date : new Date(datetime);
            return data.Format("yyyy/MM/dd HH:mm");
        },
        timeFormate:function(datetime){
            //console.log(new Date(datetime));
            //if((typeof datetime == 'string' && datetime.length == 10) || typeof datetime == 'number'){
            //    datetime = parseInt(datetime);
            //    datetime = datetime.toString().length == 10? datetime * 1000 : datetime;
            //}else{
            //    datetime = datetime.replace(/-/g, '/');
            //}
            var date = new Date(datetime) == 'Invalid Date'? new Date : new Date(datetime);
            //    tday = Math.floor((new Date).getTime()/86400000 - date.getTime()/86400000),
            //    from = Math.round(date.getTime() / 1000000),
            //    now = Math.round((new Date).getTime() / 1000000),
            //    time = now - from;
            //if(tday == 0){
            //    if(time > 3600){
            //        return Math.floor(time / 3600) + 'hrs ago'; //小时前
            //    }else if(time > 60){
            //        return Math.floor(time / 60) + 'mins ago'; //分钟前
            //    }else if(time > 0){
            //        return time + 'secs ago'; //秒前
            //    }else{
            //        return time; //刚刚
            //    }
            //}else{
            //    var ftime = date.Format("MM-dd"), //MM月dd日
            //        _now = new Date;
            //    date.setHours(0);date.setMinutes(0);date.setSeconds(0);date.setMilliseconds(0);
            //    _now.setHours(0);_now.setMinutes(0);_now.setSeconds(0);_now.setMilliseconds(0);
            //    var _time = Math.round((_now.getTime() - date.getTime()) / 1000),
            //        dday = Math.ceil(_time / 86400);
            //    if(dday > 0 && dday < 7){
            //        // if(dday <= 2){
            //        //     return dday == 1? '昨天' : '前天';
            //        if(dday <= 1){
            //            return 'yesterday';
            //        }else{
            //            return dday + ' days ago'; //天前
            //        }
            //    }else{
            //        return ftime;
            //    }
            //}
            var ftime = date.Format("MM-dd");
            return ftime;
        },
        checkEmail:function(str){
            return /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
        },
        checkPassword:function(str){
            return /^[0-9_a-zA-Z]{6,20}$/.test(str);
        },
        checkPhoneNum: function(tel){
            return /^0?1[3|4|5|6|7|8][0-9]\d{8}$/.test(tel);
        },

        checkDate: function(d){
            return /^\d{4}(\-|\/)\d{1,2}\1\d{1,2}$/.test(d);
        },
        checkInt:function(d){
            return /^[0-9]*[0-9][0-9]*$/.test(d);
        },
        filterXSS: function(html){
            return html && filterXSS(html, {
                    allowCommentTag: false,
                    whiteList: $.extend(filterXSS.whiteList, {}),
                    onIgnoreTagAttr: function(tag, name, value, isWhiteAttr){
                        if(name === 'style'){
                            value = filterXSS.safeAttrValue(tag, name, value);
                            return value? name + '="' + value + '"' : name;
                        }
                    }
                });
        },
        showSuccess:function(message,timeclose){
            var message = message || '操作成功';
            if($('.info-icon').size()){
                $.dialog.close();
            }
            $.dialog({
                type : 'info',
                contentHtml : '<img class="info-icon" src="/images/dialog/success.png" alt="操作成功" /><p class="info-text">'+message+'</p>',
                autoClose : timeclose || 2500
            });
        },
        showFail:function(message,timeclose){
            var message = message || '操作失败';
            if($('.info-icon').size()){
                $.dialog.close();
            }
            $.dialog({
                type : 'info',
                contentHtml : '<img class="info-icon" src="/images/dialog/fail.png" alt="操作成功" /><p class="info-text">'+message+'</p>',
                autoClose : timeclose || 2500
            });
        },
        showLoading:function(message,timeclose){
            var message = message || '加载中...';
            if($('.info-icon').size()){
                $.dialog.close();
            }
            $.dialog({
                type : 'info',
                contentHtml : '<img class="info-icon" src="/images/dialog/loading.gif" alt="操作成功" /><p class="info-text">'+message+'</p>',
                autoClose:timeclose || 2500
            });
        },
        showConfirm:function(option){
            $.dialog({
                type : 'confirm',
                buttonText : {
                    ok : option.ok||'确定',
                    cancel : option.cancel||'取消'
                },
                onClickOk : option.okCallback||function(){
                    //默认执行
                },
                onClickCancel : option.cancelCallback||function(){
                    //默认执行
                },
                contentHtml : option.content || '你确定执行此操作吗?'
            });
        },
        showInfo:function(message,timeclose){
            $.dialog({
                type : 'info',
                contentHtml : '<img class="info-icon" src="/images/dialog/warn.png" alt="操作成功" /><p class="info-text">'+message+'</p>',
                autoClose:timeclose || 2500
            });
        },
        sprintf: function(){
            var arg = arguments,
                str = arg[0] || '',
                i, n;
            for(i = 1, n = arg.length; i < n; i++) str = str.replace(/%s/, arg[i]);
            return str;
        },
        asynRequest: function(url, data, callback, useCache, notMultiple, key){
            notMultiple = notMultiple === false? false : true;
            callback = callback || {};
            key = key || url;

            if(typeof callback.init == 'function'){
                callback.init();
            }


            data = data || {};
            var parameter = data.parameter || {};
            $.extend(data,parameter.data || {});
            var requestType = parameter.type || 'GET',
                dataType = parameter.dataType || 'json',
                requestCache = parameter.cache || false;
            delete data.parameter;
            if(requestType == 'POST') data.YII_CSRF_TOKEN = $('#_csrftoken').val();
            $.ajax(url, {
                type: requestType, dataType: dataType, cache: requestCache, data: data,
                beforeSend: function(xhr){
                    if(typeof callback.before == 'function'){
                        callback.before();
                    }else{
                        //CHelper.showLoading();
                    }
                },
                success: function(response, status){
                    if(response && status == 'success'){
                        if(response.code == 200){
                            if(typeof callback.success == 'function'){
                                if(callback.successReturnAll === true){
                                    callback.success(response || {});
                                }else{
                                    callback.success(response.data || {});
                                }
                            }else{
                                console.log('success');
                                //success to do default
                            }
                        }else{
                            if(typeof callback.failure == 'function'){
                                callback.failure(response);
                            }else{
                                console.log('fail');
                                //fail to do default
                            }
                        }
                    }else{
                        if(typeof callback.refuse == 'function'){
                            callback.refuse(response);
                        }else{
                            console.log('refuse');
                            //refuse to do
                        }
                    }
                },
                complete: function(xhr, status){
                    if(typeof callback.complete == 'function'){
                        callback.complete(status);
                    }else{
                        console.log('complete');
                        //complete to do
                    }
                },
                error: function(xhr, msg, eThrow){
                    if(typeof callback.error == 'function'){
                        callback.error(msg);
                    }else{
                        console.log('error');
                        //error to do default
                    }
                },
            });
        },
        //阿里云上传配置
        uploadOSS: function(token,options,callback){
            var defaults = {
                'browse_button':'selectfiles',
                'container':'container',
                'max_file_size':'12mb',
                'url':'http://nanxiang.oss-cn-shanghai.aliyuncs.com'
            };
            options = $.extend(true,{}, defaults, options || {});
            token = token;
            var callback = callback || {};
            var uploader = new plupload.Uploader({
                runtimes : 'html5,flash,silverlight,html4',
                browse_button : options.browse_button,
                container: options.container,
                flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
                silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
                unique_names: true,
                multi_selection:false,
                auto_start: true,
                filter:{
                    max_file_size:'5mb',
                    mime_types:[{
                        title:'图片类型',
                        extensions:'jpg,png'
                    }]
                },
                url : options.url,
                multipart_params : {
                    'key':token.key,
                    'policy':token.policy,
                    'OSSAccessKeyId':token.OSSAccessKeyId,
                    'success_action_status':'200',
                    'signature':token.signature
                },

                init: {
                    FilesAdded: function(up, files) {
                        // console.log(up);

                        plupload.each(files, function(file) {
                            uploader.setOption('multipart_params',{
                                'key':'img/'+file.id,
                                'policy':token.policy,
                                'OSSAccessKeyId':token.OSSAccessKeyId,
                                'success_action_status':'200',
                                'signature':token.signature
                            });
                            CHelper.showLoading();
                            uploader.start();
                        });
                    },

                    UploadProgress: function(up, file) {
                        // 每个文件上传时,处理相关的事情
                        if(typeof callback.UploadProgress == 'function')
                            callback.UploadProgress(up,file);
                        else{

                        }

                    },

                    FileUploaded: function(up, file, info) {
                        if(typeof callback.FileUploaded == 'function'){
                            callback.FileUploaded(up,file);
                            CHelper.showSuccess();
                        }
                        else
                            CHelper.showSuccess();
                    },

                    Error: function(up, err) {
                        console.log(err.response)
                    }
                }
            });
            uploader.init();
        },
        changeabc:function(k){
            var dir = ['A','B','C'];
            return dir[k];
        },
        photoinit:function(ele){
            var initPhotoSwipeFromDOM = function(gallerySelector) {

                // parse slide data (url, title, size ...) from DOM elements
                // (children of gallerySelector)
                var parseThumbnailElements = function(el) {
                    var thumbElements = el.childNodes,
                        numNodes = thumbElements.length,
                        items = [],
                        figureEl,
                        linkEl,
                        size,
                        item;

                    for(var i = 0; i < numNodes; i++) {

                        figureEl = thumbElements[i]; // <figure> element

                        // include only element nodes
                        if(figureEl.nodeType !== 1) {
                            continue;
                        }

                        linkEl = figureEl.children[0]; // <a> element

                        size = linkEl.getAttribute('data-size').split('x');

                        // create slide object
                        item = {
                            src: linkEl.getAttribute('href'),
                            w: parseInt(size[0], 10),
                            h: parseInt(size[1], 10)
                        };



                        if(figureEl.children.length > 1) {
                            // <figcaption> content
                            item.title = figureEl.children[1].innerHTML;
                        }

                        if(linkEl.children.length > 0) {
                            // <img> thumbnail element, retrieving thumbnail url
                            item.msrc = linkEl.children[0].getAttribute('src');
                        }

                        item.el = figureEl; // save link to element for getThumbBoundsFn
                        items.push(item);
                    }

                    return items;
                };

                // find nearest parent element
                var closest = function closest(el, fn) {
                    return el && ( fn(el) ? el : closest(el.parentNode, fn) );
                };

                // triggers when user clicks on thumbnail
                var onThumbnailsClick = function(e) {
                    e = e || window.event;
                    e.preventDefault ? e.preventDefault() : e.returnValue = false;

                    var eTarget = e.target || e.srcElement;

                    // find root element of slide
                    var clickedListItem = closest(eTarget, function(el) {
                        return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
                    });

                    if(!clickedListItem) {
                        return;
                    }

                    // find index of clicked item by looping through all child nodes
                    // alternatively, you may define index via data- attribute
                    var clickedGallery = clickedListItem.parentNode,
                        childNodes = clickedListItem.parentNode.childNodes,
                        numChildNodes = childNodes.length,
                        nodeIndex = 0,
                        index;

                    for (var i = 0; i < numChildNodes; i++) {
                        if(childNodes[i].nodeType !== 1) {
                            continue;
                        }

                        if(childNodes[i] === clickedListItem) {
                            index = nodeIndex;
                            break;
                        }
                        nodeIndex++;
                    }



                    if(index >= 0) {
                        // open PhotoSwipe if valid index found
                        openPhotoSwipe( index, clickedGallery );
                    }
                    return false;
                };

                // parse picture index and gallery index from URL (#&pid=1&gid=2)
                var photoswipeParseHash = function() {
                    var hash = window.location.hash.substring(1),
                        params = {};

                    if(hash.length < 5) {
                        return params;
                    }

                    var vars = hash.split('&');
                    for (var i = 0; i < vars.length; i++) {
                        if(!vars[i]) {
                            continue;
                        }
                        var pair = vars[i].split('=');
                        if(pair.length < 2) {
                            continue;
                        }
                        params[pair[0]] = pair[1];
                    }

                    if(params.gid) {
                        params.gid = parseInt(params.gid, 10);
                    }

                    return params;
                };

                var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
                    var pswpElement = document.querySelectorAll('.pswp')[0],
                        gallery,
                        options,
                        items;

                    items = parseThumbnailElements(galleryElement);

                    // define options (if needed)
                    options = {

                        // define gallery index (for URL)
                        galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                        getThumbBoundsFn: function(index) {
                            // See Options -> getThumbBoundsFn section of documentation for more info
                            var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                                pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                                rect = thumbnail.getBoundingClientRect();

                            return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                        }

                    };

                    // PhotoSwipe opened from URL
                    if(fromURL) {
                        if(options.galleryPIDs) {
                            // parse real index when custom PIDs are used
                            // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                            for(var j = 0; j < items.length; j++) {
                                if(items[j].pid == index) {
                                    options.index = j;
                                    break;
                                }
                            }
                        } else {
                            // in URL indexes start from 1
                            options.index = parseInt(index, 10) - 1;
                        }
                    } else {
                        options.index = parseInt(index, 10);
                    }

                    // exit if index not found
                    if( isNaN(options.index) ) {
                        return;
                    }

                    if(disableAnimation) {
                        options.showAnimationDuration = 0;
                    }

                    // Pass data to PhotoSwipe and initialize it
                    gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
                    gallery.init();
                };

                // loop through all gallery elements and bind events
                var galleryElements = document.querySelectorAll( gallerySelector );

                for(var i = 0, l = galleryElements.length; i < l; i++) {
                    galleryElements[i].setAttribute('data-pswp-uid', i+1);
                    galleryElements[i].onclick = onThumbnailsClick;
                }

                // Parse URL and open gallery if it contains #&pid=3&gid=1
                var hashData = photoswipeParseHash();
                if(hashData.pid && hashData.gid) {
                    openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
                }
            };

// execute above function
            initPhotoSwipeFromDOM(ele);

        }
    }
    template.helper('showdate',CHelper.showdate);
    template.helper('getjsonattr',CHelper.getjsonattr);
    template.helper('comparepoint',CHelper.comparepoint);
    template.helper('timeFormate', CHelper.timeFormate);
    template.helper('isOvertime',CHelper.isOvertime);
    template.helper('timeFormatetoNormal',CHelper.timeFormatetoNormal);
    template.helper('getType',CHelper.getType);
    template.helper('photourl',CHelper.photourl);
    template.helper('json_encode',CHelper.json_encode);
    template.helper('commonpic',CHelper.commonpic);
    template.helper('usage',CHelper.usage);
    template.helper('changeabc',CHelper.changeabc);
})(window)
