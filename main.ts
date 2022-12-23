import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { FocusActiveSentenceViewPlugin, scrollEventHandler } from 'editorExtension';


interface FocusActiveSentencePluginSettings {
	sentenceDelimiters: string;
	extraCharacters: string;
}

const DEFAULT_SETTINGS: FocusActiveSentencePluginSettings = {
	sentenceDelimiters: '.!?',
	extraCharacters: '*“”‘’'
}

export default class FocusActiveSentencePlugin extends Plugin {
	settings: FocusActiveSentencePluginSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new FocusActiveSentenceSettingTab(this.app, this));

		this.registerEditorExtension(FocusActiveSentenceViewPlugin.extension);
		this.registerEditorExtension(scrollEventHandler);
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


class FocusActiveSentenceSettingTab extends PluginSettingTab {
	plugin: FocusActiveSentencePlugin;

	constructor(app: App, plugin: FocusActiveSentencePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Sentence delimiters')
			.setDesc('Characters that mark the end of a sentence. Default: .!?')
			.addText(text => text
				.setPlaceholder('.!?')
				.setValue(this.plugin.settings.sentenceDelimiters)
				.onChange(async (value) => {
					this.plugin.settings.sentenceDelimiters = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Extra characters')
			.setDesc('Characters that may follow the end of a sentence, and should be included as part of it. Default: *“”‘’')
			.addText(text => text
				.setPlaceholder('*“”‘’')
				.setValue(this.plugin.settings.extraCharacters)
				.onChange(async (value) => {
					this.plugin.settings.extraCharacters = value;
					await this.plugin.saveSettings();
				}));
	}
}