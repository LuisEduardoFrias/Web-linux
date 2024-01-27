/** @format */

"use client";

import LdDualRing from "cp/ld_dual_ring";
import { useState, useEffect } from "react";
import styles from "./files/storage.module.css";
import { Post } from "hp/fetch";

export default function storage() {
	const [showLoader, setShowLoader] = useState(false);
	const [file, setFile] = useState(null);
	const [selectfile, setSelectFile] = useState("audios");

	const handleFileChange = event => {
		setFile(event.target.files[0]);
	};

	const handleSelectChange = event => {
		setSelectFile(event.target.value);
	};

	const handleSubmit = async event => {
		event.preventDefault();
		setShowLoader(true);

		try {
			const formData = new FormData();
			formData.set("file", file);
			formData.set("fileName", file.name);
			formData.set("selectfile", selectfile);
			formData.set("userName", "root");

			const response = await fetch("/api/load_file", {
				method: "POST",
				body: formData
			});

			if (response.ok) {
				console.log("Archivo guardado con éxito");
			} else {
				console.error("Error al guardar el archivo");
			}
		} catch (error) {
			console.error("Error al enviar el archivo al servidor", error);
		}

		setShowLoader(false);
	};

	return (
		<div className={styles.container}>
			<LdDualRing show={showLoader} />

			<fieldset className={styles.section}>
				<legend>Access Control List</legend>

				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.containerSelectFile}>
						<label className={styles.label} for='files'>
							Select file
						</label>
						<select
							value={selectfile}
							onChange={handleSelectChange}
							className={styles.select}>
							<option value='audios'>Audios</option>
							<option value='documents'>Documents</option>
							<option value='downloads'>Downloads</option>
							<option value='images'>Images</option>
							<option value='videos'>Videos</option>
						</select>
					</div>

					<div className={styles.inputfile}>
						<input
							className={styles.input}
							type='file'
							id='files'
							name='files'
							onChange={handleFileChange}
						/>
						<div className={styles.labelBtn}>
							<label className={styles.fileText} for='files'>
								{file?.name ?? "file..."}
							</label>
							<label className={styles.fileBtn} for='files'>
								Seleccionar archivo
							</label>
						</div>
					</div>
					<button type='submit' className={styles.loadButton}>
						update
					</button>
				</form>
			</fieldset>
		</div>
	);
}
