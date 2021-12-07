var doc = document.getElementById('videos');

var i = 1;
var pdf_url;
var video_data = [];

function delete_inputs(id){
    console.log(id[1]);
    let video = document.getElementById(`div${id[1]}`);
    video.lastChild.value = '';
    console.log(video.lastChild.value);
    video.remove();
    i -= 1
}

function add_inputs(){
    const div = document.createElement("div");
    div.setAttribute('id', `div${i}`);
    div.setAttribute('class', 'video_data');
    const input1 = document.createElement("input");
    const input2 =  document.createElement("input");
    const input3 =  document.createElement("input");
    const btn = document.createElement('i');
    btn.setAttribute('id', `b${i}`);
    btn.onclick = function() {delete_inputs(this.id);}
    btn.setAttribute('class', "fa fa-minus-circle delete_btn");

    input1.setAttribute('name', `title${i}`);
    input1.setAttribute('class', 'video_input first_input');
    input1.setAttribute('placeholder', 'Add video title here')

    input2.setAttribute('name', `thumbnail${i}`);
    input2.setAttribute('class', 'video_input');
    input2.setAttribute('placeholder', 'Add video thumbnail url')

    input3.setAttribute('name', `url${i}`);
    input3.setAttribute('class', 'video_input');
    input3.setAttribute('placeholder', 'Add video URL')

    div.appendChild(input1);
    div.appendChild(input2);
    div.appendChild(btn);
    div.appendChild(input3);

    document.getElementById('video_fields').appendChild(div);
    i += 1;
};



// Java Script functions
function toggle_sidebar() {
    var side_bar_div = document.getElementById('side_bar_div');
    // console.log(side_bar_div);
    if (document.getElementById('side_bar_div').style.width === '25%'){
        document.getElementById('side_bar_div').style.width = '0%';
        console.log(document.getElementById('side_bar_div').style.width);
    }
    else{
        document.getElementById('side_bar_div').style.width = '25%';
        console.log(document.getElementById('side_bar_div').style.width);
    }
};

function popup_player(id) {
    let player = document.getElementById('video_player');
    let title = document.getElementById('player_title');

    document.getElementById('backdrop').style.display = 'block';

    var video = document.getElementById(`video_tag${id[1]}`);
    player.src = video.src;
    var video_title = document.getElementById(`video_title${id[1]}`);
    title.innerHTML = video_title.innerHTML;

    document.getElementById('player_div').style.display = 'block';

};


function popdown_player() {
    document.getElementById('backdrop').style.display = 'none';
    document.getElementById('player_div').style.display = 'none';
};


////////////////////////////////

// Creating DOMs

function CreateVideoDiv(new_doc, i) {
    var video_div = document.createElement('div');
    video_div.setAttribute('id', `video_div${i}`);
    var styles = {
            'width': '100%',
            'background-color':'white',
            'padding': '1rem 1rem 0 1rem',
            'position': 'relative',
            'margin': '0 auto 1rem auto',
            'background-color': 'white'
        };
    Object.assign(video_div.style, styles);
    new_doc.getElementById('side_bar_div').appendChild(video_div);
}

function CreateVideoContainer(new_doc, i){
    var video_container = document.createElement('div');
    video_container.setAttribute('id', `video_container${i}`);
    var styles = {
        'width': '90%',
        'margin': 'auto',
        'position': 'relative',
        'vertical-align': 'center'
    };
    Object.assign(video_container.style, styles);
    new_doc.getElementById(`video_div${i}`).appendChild(video_container);
}

function CreateVideoDisplay(new_doc, i, title, src){
    var video_tag = document.createElement('video');
    video_tag.setAttribute('id', `video_tag${i}`);
    video_tag.setAttribute('src', src);
    var styles = {
        'width': '100%',
        'margin': 'auto',
    };
    Object.assign(video_tag.style, styles);
    new_doc.getElementById(`video_container${i}`).appendChild(video_tag);

    var play_btn = document.createElement('i');
    play_btn.setAttribute('class', 'fa fa-play-circle');
    play_btn.setAttribute('id', `b${i}`);
    play_btn.setAttribute('onclick', 'popup_player(this.id)');
    var styles = {
        'display': 'inline-block',
        'position': 'absolute',
        'top': 'calc(50% - 2.45rem)',
        'left': '0',
        'right': '0',
        'margin-left': 'auto',
        'margin-right': 'auto',
        'font-size': '4.5rem',
        'color': 'lightblue',
        'z-index': '5',
        'width': '10%',
    };
    Object.assign(play_btn.style, styles);
    new_doc.getElementById(`video_container${i}`).appendChild(play_btn);

    var video_title = document.createElement('h2');
    video_title.setAttribute('id', `video_title${i}`);
    video_title.innerHTML = `${i}.${title}`;
    var styles = {
        'font-size': '1.2rem',
        'margin': '5px 0 0 0',
    };
    
    Object.assign(video_title.style, styles);
    new_doc.getElementById(`video_div${i}`).appendChild(video_title);
}


function AddVideo(doc, i, title, src){
    CreateVideoDiv(doc, i);
    CreateVideoContainer(doc, i);
    CreateVideoDisplay(doc, i, title, src);
}

//##################################################################################

function get_data() {
    var d = document.getElementsByTagName('input');
    pdf_url = d[0].value;

    for(let i = 1; i < d.length; i+=3){
        var data = {
            title: d[i].value,
            thumbnail: d[i+1].value,
            url: d[i+2].value
        }
        if (data.url){
            video_data.push(data);
        }
    }
    console.log(pdf_url, video_data, video_data.length);
    

// Creating the New DOM ///////////////////////////////////////////////////////////////////////////////////////
    var new_doc = document.implementation.createHTMLDocument();

    new_doc.body.style.margin = '0';
    new_doc.body.style.padding = '0';
    
    const meta = document.createElement("meta");
    meta.setAttribute('charset', "UTF-8")
    new_doc.head.appendChild(meta);

    const link = document.createElement("link");
    link.setAttribute('rel', "stylesheet");
    link.setAttribute('href', "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
    new_doc.head.appendChild(link);

    // Frame Div - Holds the iframe and the sidebar ######################################################################################################
    var frame_div = document.createElement('div')
    frame_div.setAttribute('id', 'frame_div')
    frame_div.style.width = '100%';
    frame_div.style.position = 'relative';
    

        // backdrop #####################################################################
    var backdrop = document.createElement('div');
    backdrop.setAttribute('id', 'backdrop');
    var styles = {
        'width': '100%',
        'height': '100vh',
        'background-color': 'rgba(0, 0 ,0, 0.6)',
        'z-index': '25',
        'position': 'absolute',
        'display': 'none'
    };
    Object.assign(backdrop.style, styles);
    frame_div.appendChild(backdrop);

            // Backdrop Close Button ####################################
            var close_player = document.createElement('i');
            close_player.setAttribute('class', 'fa fa-close');
            close_player.setAttribute('onclick', 'popdown_player()');
            var styles = {
                'position': 'absolute',
                'top': '5px',
                'right': '5px',
                'font-size': '4rem',
                'z-index': '50',
                'color': 'red'
            };
            Object.assign(close_player.style, styles);
            backdrop.appendChild(close_player);
            // Backdrop Close Button ####################################


        // backdrop #####################################################################

        

    
        // Frame ########################################################################
    var frame = document.createElement('iframe');
    frame.setAttribute('src', pdf_url);
    frame.setAttribute('id', 'frame');
    var styles ={
        'width': '100%',
        'height': '100vh'
    }
    Object.assign(frame.style, styles);
    frame_div.appendChild(frame);
        // Frame ########################################################################


        // video player div when played #################################################
    var player_div = document.createElement('div');
    player_div.setAttribute('id', 'player_div')
    var styles = {
        'position': 'absolute',
        'left': '0',
        'right': '0',
        'margin': '0 auto',
        'top': '20vh',
        'width': '40%',
        'height': '55vh',
        'z-index': '50',
        'background-color': 'white',
        'padding': '0.7rem 1rem 0 1rem',
        'display': 'none',
        'flex-direction': 'column'
    };
    Object.assign(player_div.style, styles);
    frame_div.appendChild(player_div)
        // video player div when played #################################################


        // video title when played ######################################################
    var player_title = document.createElement('h2');
    player_title.setAttribute('id', 'player_title');
    player_title.innerHTML = 'The Video!';
    var styles = {
    };
    Object.assign(player_title.style, styles);
    player_div.appendChild(player_title)
    
    var video_player = document.createElement('video');
    video_player.setAttribute('id', 'video_player')
    video_player.setAttribute('src', '');
    video_player.setAttribute('controls', 'true');
    var styles = {
        'margin': '0 auto',
        'width': '100%',
        // 'display': 'none',
        
    };
    Object.assign(video_player.style, styles);
    player_div.appendChild(video_player);
        // video title when played ######################################################

    
    
        // SideBar ######################################################################################################
    
    var side_bar_div = document.createElement('div');
    side_bar_div.setAttribute('id', 'side_bar_div');
    
    var styles = {
        'position' : 'absolute',
        'top': '0',
        'right': '0',
        'zindex': '3',
        'width': '0%',
        'height': '100vh',
        'opacity':'1',
        'background-color': 'rgb(146, 146, 146)',
    };
    Object.assign(side_bar_div.style, styles);
    frame_div.appendChild(side_bar_div);
    
            // Side Bar toggle Button ##############################################
    var side_toggle_btn = document.createElement('button');
    side_toggle_btn.setAttribute('id', 'side_toggle_btn');
    side_toggle_btn.setAttribute('type', 'button');
    side_toggle_btn.innerHTML = "^Videos"
    side_toggle_btn.setAttribute('onclick', 'toggle_sidebar()');
    var styles = {
        'width': '7.2rem',
        'height': '2.8rem',
        'font-size': '1.4rem',
        'transform': 'rotate(-90deg)',
        'position': 'absolute',
        'left': '-5rem',
        'top': 'calc(50% - 4rem)',
        'border': 'none',
        'border-radius': '8px',
        'background-color':'rgb(61, 140, 220)',
        'color': 'white',
    };
    Object.assign(side_toggle_btn.style, styles);
    side_bar_div.appendChild(side_toggle_btn);
            // Side Bar toggle Button ##############################################


    new_doc.body.appendChild(frame_div);

    
            // Adding Videos to the DOM ##############################################
    let c = 1;
    if (video_data.length != 0){
        video_data.forEach(data => {
            if (data.url) {
                AddVideo(new_doc, c, data.title, data.url);
                c+=1;
            }
        });
    }
    else {
            console.log('no-data');
            var no_videos = document.createElement('h2');
            no_videos.innerHTML = 'No videos to display!'
            console.log(new_doc);
            side_bar_div.appendChild(no_videos);
        }
            // Adding Videos to the DOM ##############################################
    
        // SideBar ######################################################################################################

    // Frame Div - Holds the iframe and the sidebar ######################################################################################################

    
        // Clearing the state ##############################################
    video_data = [];
    pdf_url = '';
        // Clearing the state ##############################################



            // Adding Script Tag to the DOM ##############################################
    var jscript = document.createElement('script');
    var inlineScript = document.createTextNode(toggle_sidebar.toString());
    jscript.appendChild(inlineScript);

    jscript.appendChild(document.createTextNode("\n"));

    inlineScript = document.createTextNode(popup_player.toString());
    jscript.appendChild(inlineScript);

    jscript.appendChild(document.createTextNode("\n\n"));

    console.log();
    inlineScript = document.createTextNode(popdown_player.toString());
    // console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh\n\n\n\n', inlineScript);
    jscript.appendChild(inlineScript);
    
    new_doc.body.appendChild(jscript);

        // Adding Script Tag to the DOM ##############################################


        // Serializing to XML ##############################################
    var s = new XMLSerializer();
    var str = s.serializeToString(new_doc);
    console.log(str);
        // Serializing to XML ##############################################

        // Downloading the HTLM file ##############################################
    download('new_one.html', str);
}


function download(filename, text) {
    var element = document.createElement('a');
    var CSSelement = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    // element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }





// function print_data(the_form) {
//     console.log(the_form);
// }

// console.log(window.location.pathname);


// CreateVideoDiv(new_doc, 1);
    // CreateVideoDiv(new_doc, 2);
    //
    // var video_div = document.createElement('div');
    // video_div.setAttribute('id', `video_div`);
    // var styles = {
    //         'width': '100%',
    //         'margin-bottom': '0.8rem',
    //         'background-color':'white',
    //         'padding': '1rem 1rem 0 1rem',
    //         'position': 'relative',
    //         'margin': 'auto',
    //         'background-color': 'white'
    //     };
    // Object.assign(video_div.style, styles);
    // new_doc.getElementById('side_bar_div').appendChild(video_div);


    // CreateVideoContainer(new_doc, 1);
    // CreateVideoContainer(new_doc, 2);
    //
    // var video_container = document.createElement('div');
    // video_container.setAttribute('id', 'video_container');
    // var styles = {
    //     'width': '90%',
    //     'margin': 'auto',
    //     'position': 'relative',
    //     'vertical-align': 'center'
    // };
    // Object.assign(video_container.style, styles);
    // new_doc.getElementById('video_div').appendChild(video_container);

    

    // CreateVideoDisplay(new_doc, 1, 'http://techslides.com/demos/sample-videos/small.mp4')
    // CreateVideoDisplay(new_doc, 2, 'http://techslides.com/demos/sample-videos/small.mp4')
    //
    // var video_tag = document.createElement('video');
    // video_tag.setAttribute('id', 'video_tag');
    // video_tag.setAttribute('src', 'http://techslides.com/demos/sample-videos/small.mp4');
    // var styles = {
    //     'width': '100%',
    //     'margin': 'auto',
    // };
    // Object.assign(video_tag.style, styles);
    // new_doc.getElementById('video_container').appendChild(video_tag);

    // var play_btn = document.createElement('i');
    // play_btn.setAttribute('class', 'fa fa-play-circle');
    // play_btn.setAttribute('onclick', 'popup_player()');
    // var styles = {
    //     'display': 'inline-block',
    //     'position': 'absolute',
    //     'top': 'calc(50% - 2.45rem)',
    //     'left': '0',
    //     'right': '0',
    //     'margin-left': 'auto',
    //     'margin-right': 'auto',
    //     'font-size': '4.5rem',
    //     'color': 'lightblue',
    //     'z-index': '5',
    //     'width': '10%',
    // };
    // Object.assign(play_btn.style, styles);
    // new_doc.getElementById('video_container').appendChild(play_btn);


    // var video_title = document.createElement('h2');
    // video_title.setAttribute('id', 'video_title');
    // video_title.innerHTML = "The Video!";
    // var styles = {
    //     'font-size': '1.2rem',
    //     'margin': '5px 0 0 0',
    // };
    
    // Object.assign(video_title.style, styles);
    // new_doc.getElementById('video_div').appendChild(video_title);


    // AddVideo(new_doc, 2, 'V2', 'http://techslides.com/demos/sample-videos/small.mp4')
    // AddVideo(new_doc, 3, 'V3', 'http://techslides.com/demos/sample-videos/small.mp4')