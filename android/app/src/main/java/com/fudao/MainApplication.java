package com.fudao;
import com.brentvatne.react.ReactVideoPackage;
import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.beefe.picker.PickerViewPackage;
import com.imagepicker.ImagePickerPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.aakashns.reactnativedialogs.ReactNativeDialogsPackage;
import io.realm.react.RealmReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.remobile.toast.RCTToastPackage;
import com.eguma.barcodescanner.BarcodeScannerPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RCTCameraPackage(),
            new PickerViewPackage(),
            new ImagePickerPackage(),
            new SplashScreenReactPackage(),
            new ReactNativeDialogsPackage(),
            new RealmReactPackage(),
            new VectorIconsPackage(),
			new ReactVideoPackage(),
			new RCTToastPackage(),
			new BarcodeScannerPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
