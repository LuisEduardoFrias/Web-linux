/** @format */

"use client";
import Icon from "./icon";
import File from "md/file";
import styles from "st/file_folder.module.css";
//import setting from '@/raiz/settings.json'

interface IFileFProps {
	obj: File | Folder;
	url?: string;
}

export default function FileFolder(props: IFileFProps) {
	const { obj, url } = props;
	//const {show_extention} = setting;
	const show_extention = true;

	const fileStyle = {
		left: `${obj.point.x}px`,
		top: `${obj.point.y}px`,
		position: obj.inWindow ? "static" : " absolute"
	};

	function handleClick(url: string, title: string, extention: string) {
		alert(url + "/" + title + (extention ?? ""));

		if (extention === ".mp3") {
			/* dispatch({type: actions.openApp, app:  {
      name: "vlc",
      img: "/icons/vlc.svg",
      iswindow: true,
      file: "vlc/vlc.tsx"
     }})*/
		}
	}

	return (
		<div
			style={fileStyle}
			className={styles.container}
			onClick={() => handleClick(url, obj.title, obj.extention)}>
			{obj instanceof File ? (
				obj.icon !== null ? (
					<img src={obj.icon} alt='' />
				) : (
					extentionIcon(obj.extention)
				)
			) : (
				<Icon>folder</Icon>
			)}
			<span>
				{obj.title}
				{obj instanceof File && show_extention && `${obj.extention}`}
			</span>
		</div>
	);
}

function extentionIcon(extention: string) {
	switch (extention) {
		case ".mp3":
			return <Icon>audio_file</Icon>;
		case ".mp4":
			return <Icon>video_file</Icon>;
		case ".html":
			return <Icon>html</Icon>;
		case ".css":
			return <Icon>css</Icon>;
		case ".js":
			return <Icon>javascript</Icon>;
		default:
			return <Icon>draft</Icon>;
	}
}
