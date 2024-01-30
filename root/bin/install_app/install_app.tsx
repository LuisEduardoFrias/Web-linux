/** @format */

"use client";

import LdDualRing from "cp/ld_dual_ring";
import { useState, useEffect } from "react";
import styles from "./files/install_app.module.css";
import { Post } from "hp/fetch";

export default function storage() {
	const [showLoader, setShowLoader] = useState(false);
	const [file, setFile] = useState(null);
	const [selectfile, setSelectFile] = useState("audios");

	function handleFileChange(event: eny): void {
		setFile(event.target.files[0]);
	}

	function handleSelectChange(event: any): void {
		setSelectFile(event.target.value);
	}

	async function handleSubmit(event: any): void {
		event.preventDefault();
		setShowLoader(true);

		try {
			const allowedExtensions = /(\.zip)$/i;

			if (!allowedExtensions.exec(file.name)) {
				alert("El archivo seleccionado no es de tipo .zip");
				event.target.value = "";
			} else {

				const formData = new FormData();
				formData.set("file", file);
				formData.set("fileName", file.name);

				const response = await fetch("/api/load_file", {
					method: "POST",
					body: formData
				});

				if (response.ok) {
					console.log("Archivo guardado con éxito");
				} else {
					console.error("Error al guardar el archivo");
				}
			}
		} catch (error) {
			alert(error);
			console.error("Error al enviar el archivo al servidor", error);
		}

		setShowLoader(false);
	}

	return (
		<div className={styles.container}>
			<LdDualRing show={showLoader} />

			<fieldset className={styles.section}>
				<legend>Install all</legend>

				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.inputfile}>
						<input
							className={styles.input}
							type='file'
							id='file'
							name='files'
							accept='.zip'
							onChange={handleFileChange}
						/>
						<div className={styles.labelBtn}>
							<label className={styles.fileText} for='file'>
								{file?.name ?? "file..."}
							</label>
							<label className={styles.fileBtn} for='file'>
								select app to install
							</label>
						</div>
					</div>
					<button type='submit' className={styles.loadButton}>
						install
					</button>
				</form>
			</fieldset>
		</div>
	);
}
