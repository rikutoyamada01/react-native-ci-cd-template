#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ビルド後のフックを実行する関数
async function afterBuildHook(config) {
  try {
    console.log('🔄 ビルド成功後のフックを実行中...');
    
    // Firebase CLIのインストール
    console.log('🔧 Firebase CLIをインストール中...');
    execSync('npm install -g firebase-tools');
    
    // Firebase App Distributionへのデプロイ
    if (config.platform === 'android' && config.artifact.path.endsWith('.apk')) {
      console.log('📱 Android APKをFirebase App Distributionに配布中...');
      
      // サービスアカウントJSONファイルの作成
      const serviceAccountPath = path.join(process.cwd(), 'service-account.json');
      fs.writeFileSync(serviceAccountPath, process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      
      const releaseNotes = `自動ビルドとデプロイ\n
        ビルドプロファイル: ${config.profile}
        コミットハッシュ: ${process.env.EAS_BUILD_GIT_COMMIT_HASH || 'N/A'}
        ビルド番号: ${process.env.EAS_BUILD_ID || 'N/A'}
      `;
      
      // Firebase App Distributionにデプロイ
      execSync(`firebase appdistribution:distribute "${config.artifact.path}" \
        --app "${process.env.FIREBASE_APP_ID_ANDROID}" \
        --groups "testers" \
        --release-notes "${releaseNotes}" \
        --service-account service-account.json`, 
        { stdio: 'inherit' }
      );
      
      console.log('✅ Firebase App Distributionへの配布が完了しました！');
    } else if (config.platform === 'ios' && (config.artifact.path.endsWith('.ipa') || config.artifact.path.endsWith('.app'))) {
      console.log('📱 iOS IPAをFirebase App Distributionに配布中...');
      
      // サービスアカウントJSONファイルの作成
      const serviceAccountPath = path.join(process.cwd(), 'service-account.json');
      fs.writeFileSync(serviceAccountPath, process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      
      const releaseNotes = `自動ビルドとデプロイ\n
        ビルドプロファイル: ${config.profile}
        コミットハッシュ: ${process.env.EAS_BUILD_GIT_COMMIT_HASH || 'N/A'}
        ビルド番号: ${process.env.EAS_BUILD_ID || 'N/A'}
      `;
      
      // Firebase App Distributionにデプロイ
      execSync(`firebase appdistribution:distribute "${config.artifact.path}" \
        --app "${process.env.FIREBASE_APP_ID_IOS}" \
        --groups "testers" \
        --release-notes "${releaseNotes}" \
        --service-account service-account.json`, 
        { stdio: 'inherit' }
      );
      
      console.log('✅ Firebase App Distributionへの配布が完了しました！');
    } else {
      console.log('⚠️ サポートされていないビルド成果物です:', config.artifact.path);
    }
  } catch (error) {
    console.error('❌ ビルド後のフックでエラーが発生しました:', error);
    process.exit(1);
  }
}

module.exports = afterBuildHook;
