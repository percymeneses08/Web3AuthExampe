package com.sbz.web3authdemoapp

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.google.gson.Gson
import com.web3auth.core.Web3Auth
import com.web3auth.core.types.LoginParams
import com.web3auth.core.types.Provider
import com.web3auth.core.types.Web3AuthOptions
import com.web3auth.core.types.Web3AuthResponse
import java8.util.concurrent.CompletableFuture


class MainActivity : AppCompatActivity() {

    private lateinit var web3Auth: Web3Auth

    private val gson = Gson()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        web3Auth = Web3Auth(
           Web3AuthOptions(
               context = this,
               clientId = getString(R.string.web3auth_project_id), // pass over your Web3Auth Client ID from Developer Dashboard
               network = Web3Auth.Network.TESTNET, // pass over the network you want to use (MAINNET or TESTNET or CYAN)
               redirectUrl = Uri.parse("com.sbz.web3authdemoapp://auth"), // your app's redirect URL
               // Optional parameters
               whiteLabel = WhiteLabelData(
                   "Web3Auth dApp Share", null, null, "en", true,
                   hashMapOf(
                       "primary" to "#F1C40F"
                   )
               ),
               loginConfig = hashMapOf("google" to LoginConfigItem(
                   verifier = "web3auth-core-google",
                   typeOfLogin = TypeOfLogin.GOOGLE,
                   name = "Custom Google Login",
                   clientId = getString(R.string.web3auth_google_client_id)
               ))
           )
       )

        // Handle user signing in when app is not alive
        web3Auth.setResultUrl(intent?.data)

        // Setup UI and event handlers
        val signInButton = findViewById<Button>(R.id.signInButton)
        signInButton.setOnClickListener { signIn() }

        val signOutButton = findViewById<Button>(R.id.signOutButton)
        signOutButton.setOnClickListener { signOut() }

        reRender(Web3AuthResponse())
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)

        // Handle user signing in when app is active
        web3Auth.setResultUrl(intent?.data)
    }

    private fun signIn() {
        val selectedLoginProvider = Provider.GOOGLE   // Can be GOOGLE, FACEBOOK, TWITCH etc.
        val loginCompletableFuture: CompletableFuture<Web3AuthResponse> = web3Auth.login(LoginParams(selectedLoginProvider))

    //    For Email Passwordless, use the below code and pass email id into extraLoginOptions of LoginParams.
    //    val selectedLoginProvider = Provider.EMAIL_PASSWORDLESS
    //    val loginCompletableFuture: CompletableFuture<Web3AuthResponse> = web3Auth.login(LoginParams(selectedLoginProvider, extraLoginOptions = ExtraLoginOptions(login_hint = "shahbaz.web3@gmail.com")))

    //    For login with JWT, use the below code and pass email id into extraLoginOptions of LoginParams.
    //    val selectedLoginProvider = Provider.JWT
    //    val loginCompletableFuture: CompletableFuture<Web3AuthResponse> = web3Auth.login(LoginParams(selectedLoginProvider, extraLoginOptions = ExtraLoginOptions(id_token_hint = "<id-token>")))

        loginCompletableFuture.whenComplete { loginResponse, error ->
            if (error == null) {
                println(loginResponse)
                reRender(loginResponse)
            } else {
                Log.d("MainActivity_Web3Auth", error.message ?: "Something went wrong" )
            }
        }
    }

    private fun signOut() {
        val logoutCompletableFuture =  web3Auth.logout()
        logoutCompletableFuture.whenComplete { _, error ->
            if (error == null) {
                reRender(Web3AuthResponse())
            } else {
                Log.d("MainActivity_Web3Auth", error.message ?: "Something went wrong" )
            }
        }
        recreate()
    }

    private fun reRender(web3AuthResponse: Web3AuthResponse) {
        val contentTextView = findViewById<TextView>(R.id.contentTextView)
        val signInButton = findViewById<Button>(R.id.signInButton)
        val signOutButton = findViewById<Button>(R.id.signOutButton)

        val key = web3AuthResponse.privKey
        val userInfo = web3AuthResponse.userInfo
        println(userInfo)
        if (key is String && key.isNotEmpty()) {
            contentTextView.text = gson.toJson(web3AuthResponse)
            contentTextView.visibility = View.VISIBLE
            signInButton.visibility = View.GONE
            signOutButton.visibility = View.VISIBLE
        } else {
            contentTextView.text = getString(R.string.not_logged_in)
            contentTextView.visibility = View.GONE
            signInButton.visibility = View.VISIBLE
            signOutButton.visibility = View.GONE
        }
    }
}