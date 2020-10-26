const NodeMediaServer = require("node-media-server");
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");


app.use(express.static(path.join(__dirname, "views")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const config = {
	rtmp: {
		port: 1935,
		chunk_size: 60000,
		gop_cache: true,
		ping: 30,
		ping_timeout: 60
	},
	http: {
		port: 8000,
		mediaroot: "./media",
		allow_origin: "*"
	},
	trans: {
		ffmpeg: "/usr/bin/ffmpeg",
		tasks: [
			{
				app: 'live',
				mp4: true,
				mp4Flags: '[movflags=frag_keyframe+empty_moov]'
			}
		]
	}
};

var nms = new NodeMediaServer(config);
nms.run();


app.get("/", (req, res) => {
	res.render("index.ejs");
});

app.listen(777, '0.0.0.0', () => {
	console.log("server running");
});

