module ApplicationHelper
  def auth_token
    html = "<input type=\"hidden\"
                   name=\"authenticity_token\"
                   value=\"#{form_authenticity_token}\">"
    html.html_safe
  end

  def button_to_sign_out
    html = "<form action=\"#{session_url}\" method=\"post\">
            <input type='hidden' name='_method' value='delete'>
            #{auth_token}
            <button>sign out</button>
            </form>"

    html.html_safe
  end
end
